"use client"

import React, { useState, useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from 'nextra-theme-docs';
import { themeDark, themeLight } from '../../config.js';
import { onnxruntimeEditorFiles } from '../../editor-files-onnxruntime.js';
import { Html5Icon, VanillaIcon, SvelteIcon, ReactIcon, VueIcon } from '../../../../_components/icons/js_frameworks.jsx'
import { TransformersjsIcon, OnnxIcon, WebNNIcon, LiteRTIcon } from '../../../../_components/icons/editor.jsx'
import { extractIdFromOnnxRuntimePath } from '../../utils.js';
import { Playground } from '../../../../_components/playground.jsx';

export default function Page() {
  const framework = 'onnxruntime';
  const { theme, setTheme } = useTheme();
  let editorTheme = themeLight;
  console.log(`theme: ${theme}`);
  (theme === 'dark') ? editorTheme = themeDark : editorTheme = themeLight;

  const [js, setJs] = useState('static');

  // Add state for menu overlay
  const [menuOpen, setMenuOpen] = useState(false);

  // Add effect to disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const id = extractIdFromOnnxRuntimePath();

  let files;
  let title;
  try {
    if (onnxruntimeEditorFiles[id] && onnxruntimeEditorFiles[id][js]) {
      files = onnxruntimeEditorFiles[id][js];
      title = onnxruntimeEditorFiles[id].title;
      console.log(`Successfully loaded files for ${id}/${js}`);
    } else {
      console.error(`Requested combination of ${id}/${js} does not exist`);
    }
  } catch (error) {
    console.error("Error accessing files:", error);
  }

  const handleJsChange = (newJs) => {
    setJs(newJs);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="md:px-8 xl:px-8 mb-8">
        <div className="mx-1 md:mx-0 playground-nav">
          <div className='self-center playground-nav-12'>
            <div className="flex flex-row">
              <h2 className="pl-4 text-xl md:text-2xl font-title light-color py-1">
                Playground
              </h2>
              <div className="selected-framework-js ml-4 self-center">
                {/* Only show currently selected icons */}
                {framework === 'webnn' && <WebNNIcon />}
                {framework === 'onnxruntime' && <OnnxIcon />}
                {framework === 'transformersjs' && <TransformersjsIcon />}
                {framework === 'litert' && <LiteRTIcon />}
                {js === 'static' && <Html5Icon />}
                {js === 'vanilla' && <VanillaIcon />}
                {js === 'svelte' && <SvelteIcon />}
                {js === 'react' && <ReactIcon />}
                {js === 'vue' && <VueIcon />}
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-end self-end justify-items-end text-sm lg:self-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
              <div className='self-center'>{title}</div>
              <div className="pg-menu-wrap">
                {/* Hamburger Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="flex flex-col justify-center items-center w-8 h-8 mr-4 space-y-1.5 cursor-pointer focus:outline-none"
                  aria-label="Menu"
                >
                  <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-400 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-400 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-400 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Full-screen Overlay Menu */}
                {menuOpen && (
                  <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-30 flex flex-col items-center justify-center">
                    <div className="absolute pg-menu-close">
                      <a
                        onClick={toggleMenu}
                        className="!text-4xl hover:cursor-pointer block focus:outline-none"
                        aria-label="Close menu"
                      >
                        &times;
                      </a>
                    </div>

                    <div className="text-center" id="playground-menu">
                      <h2 className="text-2xl font-bold mb-8 text-[#00c8ff] dark:text-gray-200">Playgound</h2>
                      <Playground isEditorPage={true} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="self-center">
            <div className={`pg-js ${js}`}>
              {onnxruntimeEditorFiles[id]?.static && (
                <button
                  className="static hover:cursor-pointer"
                  onClick={() => handleJsChange('static')}
                >
                  <Html5Icon className="static" />
                  <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'static' ? 'text-gray-800 dark:text-gray-200' : ''}`}>
                    Static
                  </span>
                </button>
              )}
              {onnxruntimeEditorFiles[id]?.vanilla && (
                <button
                  className="vanilla hover:cursor-pointer"
                  onClick={() => handleJsChange('vanilla')}
                >
                  <VanillaIcon className="vanilla" />
                  <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'vanilla' ? 'text-gray-800 dark:text-gray-200' : ''}`}>
                    Vanilla
                  </span>
                </button>
              )}
              {onnxruntimeEditorFiles[id]?.svelte && (
                <button
                  className="svelte hover:cursor-pointer"
                  onClick={() => handleJsChange('svelte')}
                >
                  <SvelteIcon className="svelte" />
                  <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'svelte' ? 'text-gray-800 dark:text-gray-200' : ''}`}>
                    Svelte
                  </span>
                </button>
              )}
              {onnxruntimeEditorFiles[id]?.react && (
                <button
                  className="react hover:cursor-pointer"
                  onClick={() => handleJsChange('react')}
                >
                  <ReactIcon className="react" />
                  <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'react' ? 'text-gray-800 dark:text-gray-200' : ''}`}>
                    React
                  </span>
                </button>
              )}
              {onnxruntimeEditorFiles[id]?.vue && (
                <button
                  className="vue hover:cursor-pointer"
                  onClick={() => handleJsChange('vue')}
                >
                  <VueIcon className="vue" />
                  <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'vue' ? 'text-gray-800 dark:text-gray-200' : ''}`}>
                    Vue
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <Sandpack className="!mx-1 md:!mx-0 editor"
          template={js}
          theme={editorTheme}
          options={{
            editorHeight: 558,
            showLineNumbers: true,
            showConsole: true,
            showConsoleButton: true
          }}
          customSetup={{
            dependencies: {
              // "svelte": "^5.22.6",
              // "@huggingface/transformers": "^3.4.0"
            }
          }}
          files={files}
        />
      </div>
    </div>
  )
}