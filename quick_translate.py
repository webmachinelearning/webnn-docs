import re, os
import urllib.request, urllib.parse, json
import time

target_files = [
    'content/zh/index.mdx',
    'content/zh/blog.mdx',
    'content/zh/api-reference/webnn/mlgraphbuilder-ops.mdx',
    'content/zh/api-reference/webnn/mlgraphbuilder.mdx',
    'content/zh/api-reference/webnn/ml.mdx',
    'content/zh/api-reference/webnn/mloperand.mdx',
    'content/zh/api-reference/webnn/navigatorml.mdx',
    'content/zh/api-reference/webnn/mlcontext.mdx',
    'content/zh/api-reference/webnn/mltensor.mdx',
    'content/zh/api-reference/reference.mdx',
    'content/zh/api-reference/browser-compatibility/litert.mdx',
    'content/zh/api-reference/browser-compatibility/windowsml.mdx',
    'content/zh/api-reference/browser-compatibility/deviceselection.mdx',
    'content/zh/learn/tutorials/transformers-js/free-dimension-overrides.mdx',
    'content/zh/learn/tutorials/transformers-js/transformers-js.mdx',
    'content/zh/learn/tutorials/lite-rt/lite-rt.mdx',
    'content/zh/learn/tutorials/webnn/webnnutils-onnxconverter.mdx',
    'content/zh/learn/tutorials/webnn/onnx2webnn.mdx',
    'content/zh/learn/tutorials/webnn/vanillajs.mdx',
    'content/zh/learn/tutorials/index.mdx',
    'content/zh/learn/tutorials/onnx-runtime/free-dimension-overrides.mdx',
    'content/zh/learn/tutorials/onnx-runtime/onnx-runtime.mdx',
    'content/zh/learn/get-started/debug.mdx',
    'content/zh/learn/get-started/quickstart.mdx',
    'content/zh/learn/get-started/testing.mdx',
    'content/zh/learn/get-started/using-typescript.mdx',
    'content/zh/learn/get-started/installation.mdx',
    'content/zh/learn/troubleshooting/framework-errors.mdx',
    'content/zh/learn/troubleshooting/hardware-errors.mdx',
    'content/zh/learn/troubleshooting/performance-issues.mdx',
    'content/zh/learn/troubleshooting/common-errors.mdx',
    'content/zh/learn/troubleshooting/backend-errors.mdx'
]

def translate_text(text):
    try:
        url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=' + urllib.parse.quote(text)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        data = json.loads(response.read().decode('utf-8'))
        return ''.join([sentence[0] for sentence in data[0]])
    except Exception as e:
        return text

def translate_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return
        
    if len(re.findall(r'[\u4e00-\u9fa5]', content)) > 10:
        return
        
    print(f"Translating {filepath}")
    lines = content.split('\n')
    translated_lines = []
    
    in_code = False
    in_frontmatter = False
    
    for line in lines:
        if line.strip() == '---' and not in_frontmatter and not in_code:
            in_frontmatter = True
            translated_lines.append(line)
            continue
        if in_frontmatter:
            translated_lines.append(line)
            if line.strip() == '---':
                in_frontmatter = False
            continue
            
        if line.startswith('```'):
            in_code = not in_code
            translated_lines.append(line)
            continue
            
        if in_code or line.startswith('import ') or line.startswith('export ') or line.startswith('| ') or line.startswith('<') or not any(c.isalpha() for c in line):
            translated_lines.append(line)
            continue
            
        # extract formatting we want to keep English
        placeholders = {}
        def repl(m):
            k = f" [[P{len(placeholders)}]] "
            placeholders[k.strip()] = m.group(0)
            return k
            
        t1 = re.sub(r'\[([^\]]+)\]\([^)]+\)', repl, line)
        t1 = re.sub(r'`[^`]+`', repl, t1)
        
        for w in ['WebNN', 'API', 'ONNX', 'LiteRT', 'CoreML', 'WindowsML', 'TensorFlow', 'MLGraphBuilder', 'MLContext', 'MLOperand', 'MLTensor']:
            t1 = re.sub(rf'\b{w}\b', repl, t1, flags=re.IGNORECASE)
            
        # translate paragraph
        res = translate_text(t1)
        if res == t1:
            translated_lines.append(line)
            continue
            
        # restore
        for k, v in placeholders.items():
            res = res.replace(" [ [ P" + k.strip()[3:-3] + "] ] ", v)
            res = res.replace("[[P" + k.strip()[3:-3] + "]]", v)
            res = res.replace("【P" + k.strip()[3:-3] + "】", v)
            res = res.replace("[P" + k.strip()[3:-3] + "]", v)
            res = res.replace("［P" + k.strip()[3:-3] + "］", v)
            
            # fix possible broken cases
            res = re.sub(r'\[\[[\s]*P' + k.strip()[3:-3] + r'[\s]*\]\]', v, res)
            res = re.sub(r'【[\s]*P' + k.strip()[3:-3] + r'[\s]*】', v, res)
            res = re.sub(r'\[[\s]*P' + k.strip()[3:-3] + r'[\s]*\]', v, res)
            
            # if still hasn't matched
            if k.strip() not in res and v not in res:
                res = res + " " + v  # naive fallback
            res = res.replace(k.strip(), v)
            
        translated_lines.append(res)
        time.sleep(0.1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(translated_lines))
    print(f"Saved {filepath}")

for f in target_files:
    translate_file(f)
