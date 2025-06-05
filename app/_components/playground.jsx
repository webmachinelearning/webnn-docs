import { webnnEditorFiles } from '../../app/[lang]/playground/editor-files-webnn.js';
import { onnxruntimeEditorFiles } from '../../app/[lang]/playground/editor-files-onnxruntime.js';
import { transformersjsEditorFiles } from '../../app/[lang]/playground/editor-files-transformersjs.js';
import { liteRTEditorFiles } from '../../app/[lang]/playground/editor-files-litert.js';
import { TransformersjsIcon, OnnxIcon, WebNNIcon, LiteRTIcon } from './icons/editor.jsx'

export function Playground({ isEditorPage }) {
  // Function to generate cards from editorFiles
  const generateCards = (j, files) => {
    const cards = [];
    const js = ["vanilla", "react", "static", "vue", "svelte"];

    // Traverse through examples in editorFiles
    Object.entries(files).forEach(([exampleId, exampleData]) => {
      // Check if the example has at least one of the specified frameworks
      const hasJs = js.some(framework => framework in exampleData);

      let path = `./playground/${j}/${exampleId}`;
      if (isEditorPage) {
        path = `../../playground/${j}/${exampleId}`;
      }

      // Only add card if it has title, description, and at least one framework
      if (exampleData.title && exampleData.description && hasJs) {
        cards.push({
          id: exampleId,
          exampleId: exampleId,
          title: exampleData.title,
          description: exampleData.description,
          href: path
        });
      }
    });

    return cards;
  };

  const webnnCards = generateCards("webnn", webnnEditorFiles);
  const onnxruntimeCards = generateCards("onnxruntime", onnxruntimeEditorFiles);
  const transformersjsCards = generateCards("transformersjs", transformersjsEditorFiles);
  const litertCards = generateCards("litert", liteRTEditorFiles);

  return (
    <div className="pg-com min-h-screen overflow-y-auto px-2 md:px-8 xl:px-8">
      <h2 className="text-4xl font-title light-color !text-center pt-4 my-4">Playground</h2>
      <h3 id="webnn" className="text-2xl font-title light-color px-4 text-left mt-4 md:mt-8"><WebNNIcon /> WebNN</h3>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-y-0 gap-x-2 md:gap-2">
          {webnnCards.map((card) => (
            <a className="p-2 md:rounded-sm text-sm x:text-gray-700 x:hover:text-gray-900 x:dark:text-neutral-200 x:dark:hover:text-neutral-50 x:group x:focus-visible:nextra-focus nextra-card x:overflow-hidden x:border x:border-gray-200 x:text-current x:no-underline x:dark:shadow-none x:hover:shadow-gray-100 x:dark:hover:shadow-none x:shadow-gray-100 x:active:shadow-sm x:active:shadow-gray-200 x:transition-all x:duration-200 x:hover:border-gray-300 x:bg-transparent x:shadow-sm x:dark:border-neutral-800 x:hover:bg-slate-50 x:hover:shadow-md x:dark:hover:border-neutral-700 x:dark:hover:bg-neutral-900"
              id={card.id}
              title={card.description}
              href={card.href}
            >{card.title}</a>
          ))}
        </div>
      </div>
      <h3 id="transformersjs" className="text-2xl font-title light-color px-4 text-left mt-4 md:mt-8"><TransformersjsIcon /> Transformers.js</h3>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-y-0 gap-x-2 md:gap-2">
          {transformersjsCards.map((card) => (
            <a className="p-2 md:rounded-sm text-sm x:text-gray-700 x:hover:text-gray-900 x:dark:text-neutral-200 x:dark:hover:text-neutral-50 x:group x:focus-visible:nextra-focus nextra-card x:overflow-hidden x:border x:border-gray-200 x:text-current x:no-underline x:dark:shadow-none x:hover:shadow-gray-100 x:dark:hover:shadow-none x:shadow-gray-100 x:active:shadow-sm x:active:shadow-gray-200 x:transition-all x:duration-200 x:hover:border-gray-300 x:bg-transparent x:shadow-sm x:dark:border-neutral-800 x:hover:bg-slate-50 x:hover:shadow-md x:dark:hover:border-neutral-700 x:dark:hover:bg-neutral-900"
            id={card.id}
            title={card.description}
            href={card.href}
          >{card.title}</a>
          ))}
        </div>
      </div>
      <h3 id="onnx" className="text-2xl font-title light-color px-4 text-left mt-4 md:mt-8"><OnnxIcon /> ONNX Runtime Web</h3>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-y-0 gap-x-2 md:gap-2">
          {onnxruntimeCards.map((card) => (
            <a className="p-2 md:rounded-sm text-sm x:text-gray-700 x:hover:text-gray-900 x:dark:text-neutral-200 x:dark:hover:text-neutral-50 x:group x:focus-visible:nextra-focus nextra-card x:overflow-hidden x:border x:border-gray-200 x:text-current x:no-underline x:dark:shadow-none x:hover:shadow-gray-100 x:dark:hover:shadow-none x:shadow-gray-100 x:active:shadow-sm x:active:shadow-gray-200 x:transition-all x:duration-200 x:hover:border-gray-300 x:bg-transparent x:shadow-sm x:dark:border-neutral-800 x:hover:bg-slate-50 x:hover:shadow-md x:dark:hover:border-neutral-700 x:dark:hover:bg-neutral-900"
            id={card.id}
            title={card.description}
            href={card.href}
          >{card.title}</a>
          ))}
        </div>
      </div>
      <h3 id="litert" className="text-2xl font-title light-color px-4 text-left mt-4 md:mt-8"><LiteRTIcon /> LiteRT</h3>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-y-0 gap-x-2 md:gap-2">
          {litertCards.map((card) => (
            <a className="p-2 md:rounded-sm text-sm x:text-gray-700 x:hover:text-gray-900 x:dark:text-neutral-200 x:dark:hover:text-neutral-50 x:group x:focus-visible:nextra-focus nextra-card x:overflow-hidden x:border x:border-gray-200 x:text-current x:no-underline x:dark:shadow-none x:hover:shadow-gray-100 x:dark:hover:shadow-none x:shadow-gray-100 x:active:shadow-sm x:active:shadow-gray-200 x:transition-all x:duration-200 x:hover:border-gray-300 x:bg-transparent x:shadow-sm x:dark:border-neutral-800 x:hover:bg-slate-50 x:hover:shadow-md x:dark:hover:border-neutral-700 x:dark:hover:bg-neutral-900"
            id={card.id}
            title={card.description}
            href={card.href}
          >{card.title}</a>
          ))}
        </div>
      </div>
    </div>
  );
}