"use client";

import Script from "next/script";

export default function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <div className="my-8 flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[.02]">
      <div className="text-center">
        <div className="mb-2 text-xs text-slate-500">{label}</div>

        {/* Adsterra Banner 320x50 */}
        <div className="flex justify-center">
          <div id="adsterra-banner-320x50">
            <Script
              id="adsterra-banner-config"
              strategy="afterInteractive"
            >{`
              atOptions = {
                'key' : '7f301aa5e5ca544b31ab2e25c3f14b5d',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
              };
            `}</Script>

            <Script
              id="adsterra-banner-invoke"
              src="https://www.highrevenueformat.com/7f301aa5e5ca544b31ab2e25c3f14b5d/invoke.js"
              strategy="afterInteractive"
            />
          </div>
        </div>

        {/* Adsterra second placement */}
        <div className="mt-4 w-full">
          <Script
            id="adsterra-container-invoke"
            src="https://pl31227792.profitableratecpmnetwork.com/cce8afbd440237a58fd3649d5997c642/invoke.js"
            strategy="afterInteractive"
          />
          <div id="container-cce8afbd440237a58fd3649d5997c642" />
        </div>
      </div>
    </div>
  );
}
