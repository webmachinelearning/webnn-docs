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
        Web Neural Network API 使 Web 应用能够直接在浏览器中执行高性能机器学习推理。WebNN 基于图计算,专为 <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">NPU</span> 加速而优化,同时支持 <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">GPU</span> 和 <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">CPU</span>。目前, WebNN 是唯一能够在 Web 中访问 <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">NPU</span> 的 API。
      </div>
      <div className="my-4 flex flex-col xl:flex-row gap-2 text-sm">
        <span className="w-fit px-2 py-1 border rounded-full">端侧推理</span>
        <span className="w-fit px-2 py-1 border rounded-full">基于计算图</span>
        <span className="w-fit px-2 py-1 border rounded-full">唯一 NPU 访问</span>
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
