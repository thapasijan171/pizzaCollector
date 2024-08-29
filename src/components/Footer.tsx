/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <p className="flex gap-2 justify-center items-center w-full p-6 font-sans text-sm text-zinc-300 md:w-2/3 md:p-4 lg:w-1/2 ">
      Made with {`<3`} by{" "}
      <a
        className="text-pink-200"
        href="https://github.com/thapasijan171/lyrics-finder"
        target={"_blank"}
        rel="noreferrer"
      >
        Sijan Thapa
      </a>
    </p>
  );
}
