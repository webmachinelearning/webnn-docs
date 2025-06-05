"use client";
import React from "react";
import Link from "next/link";
import BoltIcon from '../icons/bolt.jsx'
import ShowcaseIcon from '../icons/showcase.jsx'

export default function Hero() {
  return (
    <div className="z-1 xl:col-span-1 px-6 md:px-4 xl:pl-8 xl:pr-4 2xl:pl-10 pt-20 md:pt-24 lg:pt-28 items-center justify-items-base backdrop-blur-[0px] bg-transparent">
      <h1 className="font-title tracking-[-0.02rem] !text-4xl lg:!text-5xl xl:!text-5xl 2xl:!text-5xl mb-4 font-extrabold">
        WebNN: Neural Network Acceleration for the Web
      </h1>
      <div>
        Web Neural Network API, a new web standard will play a pivotal role in
        the future of web development by enabling seamless integration of
        artificial intelligence (AI) directly within web browsers, allowing for
        faster, more efficient AI-powered applications on user devices.
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
