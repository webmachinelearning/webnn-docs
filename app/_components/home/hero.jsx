"use client";
import React from "react";
import Link from "next/link";
import BoltIcon from '../icons/bolt.jsx'
import ShowcaseIcon from '../icons/showcase.jsx'

export default function Hero() {
  return (
    <div className="z-1 xl:col-span-1 px-6 md:px-4 xl:pl-8 xl:pr-4 2xl:pl-10 pt-20 md:pt-20 lg:pt-24 items-center justify-items-base backdrop-blur-[0px] bg-transparent">
      <h1 className="font-title tracking-[-0.02rem] !text-4xl lg:!text-5xl xl:!text-5xl 2xl:!text-5xl mb-4 font-extrabold">
        WebNN: Neural Network Acceleration for the Web
      </h1>
      <div>
        The Web Neural Network API enables web applications to perform high-performance machine learning inference directly in the browser, utilizing graph-based computation that is optimally suited for <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">NPU</span> acceleration, while also supporting <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">GPU</span> and <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">CPU</span>. WebNN is currently the only API that provides access to <span className="underline decoration-dashed decoration-pink-500 underline-offset-4">NPU</span> through Web.
      </div>
      <div className="my-4 flex flex-row gap-2 text-sm">
        <span className="w-fit px-2 py-1 border rounded-full">On-device AI</span>
        <span className="w-fit px-2 py-1 border rounded-full">Graph-based Computation</span>
        <span className="w-fit px-2 py-1 border rounded-full">Unique NPU Access</span>
      </div>
      <div className="my-8 block grid grid-rows-2 gap-4 lg:block">
        <Link
          href="/learn/get-started/quickstart"
          className="button-highlight px-4 md:px-6 py-2 md:py-3"
        >
          <BoltIcon className="w-5 h-5 mr-1 inline-flex" /> Quickstart
        </Link>
        <Link
          href="/showcase"
          className="button-outline ml-0 lg:ml-4 px-4 md:px-6 py-2 md:py-3"
        >
          <ShowcaseIcon className="w-5 h-5 mr-1 inline-flex" /> Showcase
        </Link>
      </div>
    </div>
  );
}
