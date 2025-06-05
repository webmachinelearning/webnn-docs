"use client";
import React from "react";
import Link from "next/link";
import BoltIcon from '../icons/bolt.jsx'
import ShowcaseIcon from '../icons/showcase.jsx'

export default function HeroCh() {

  return (
    <div className="z-1 xl:col-span-1 px-6 md:px-8 xl:pl-20 xl:pr-4 2xl:pl-20 pt-20 md:pt-24 lg:pt-28 items-center justify-items-base backdrop-blur-[0px] bg-transparent">
      <h1 className="font-title tracking-[-0.02rem] text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl mb-4 font-bold">
        WebNN: Web 端侧推理加速
      </h1>
      <div>
      Web Neural Network (WebNN) API 允许 Web 开发者在浏览器中通过 TypeScript 或 JavaScript 运行人工智能模型。利用端侧 CPU, GPU 或 NPU 加速，WebNN 能显著提升 AI 应用的性能和效率。
      </div>
      <div className="my-8 block grid grid-rows-2 gap-4 lg:block">
        <Link
          href="/learn/get-started/quickstart"
          className="button-highlight px-4 md:px-6 py-2 md:py-3"
        >
          <BoltIcon className="w-5 h-5 mr-1 inline-flex" /> 快速开始
        </Link>
        <Link
          href="/showcase"
          className="button-outline ml-0 lg:ml-4 px-4 md:px-6 py-2 md:py-3"
        >
          <ShowcaseIcon className="w-5 h-5 mr-1 inline-flex" /> 示例
        </Link>
      </div>
    </div>
  );
}
