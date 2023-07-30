/* eslint-disable @next/next/no-img-element */
import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <>
      <div className="flex flex-col mx-auto overflow-hidden max-w-7xl ">
        <div className="z-10 p-4 bg-body/20 backdrop-brightness-20 backdrop-blur-sm">
          <nav className="relative flex justify-between w-full gap-6 ">
            <div className="relative inline-flex min-w-max">
              <a href="/" className="relative flex items-center gap-3">
                <svg
                  className="text-[#1D2228] dark:text-white"
                  width="110"
                  height="24"
                  viewBox="0 0 182 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.4142 31.4142L24.6667 28.1618V32.5049L20 37.1716L15.3333 32.5049V28.1618L18.5858 31.4142L20 32.8284L21.4142 31.4142ZM7.49509 24.6667L2.82843 20L7.49509 15.3333H11.8382L8.58579 18.5858L7.17157 20L8.58579 21.4142L11.8382 24.6667H7.49509ZM15.3333 11.8382V7.49509L20 2.82843L24.6667 7.49509V11.8382L21.4142 8.58579L20 7.17157L18.5858 8.58579L15.3333 11.8382ZM28.1618 15.3333H32.5049L37.1716 20L32.5049 24.6667H28.1618L31.4142 21.4142L32.8284 20L31.4142 18.5858L28.1618 15.3333Z"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></path>
                  <mask id="path-2-inside-1_171_305" fill="white">
                    <path d="M66.88 35.38C64.8 35.38 62.9333 34.8867 61.28 33.9C59.6533 32.8867 58.36 31.5267 57.4 29.82C56.4667 28.1133 56 26.1933 56 24.06C56 21.9267 56.48 20.0067 57.44 18.3C58.4 16.5933 59.6933 15.2467 61.32 14.26C62.9467 13.2733 64.7867 12.78 66.84 12.78C68.5733 12.78 70.1067 13.1267 71.44 13.82C72.7733 14.5133 73.8267 15.4733 74.6 16.7L73.92 17.74V4.62H78.4V34.9H74.12V30.5L74.64 31.34C73.8933 32.6467 72.8267 33.6467 71.44 34.34C70.0533 35.0333 68.5333 35.38 66.88 35.38ZM67.32 31.18C68.5733 31.18 69.6933 30.8733 70.68 30.26C71.6933 29.6467 72.48 28.8067 73.04 27.74C73.6267 26.6467 73.92 25.42 73.92 24.06C73.92 22.7 73.6267 21.4867 73.04 20.42C72.48 19.3533 71.6933 18.5133 70.68 17.9C69.6933 17.2867 68.5733 16.98 67.32 16.98C66.0667 16.98 64.9333 17.2867 63.92 17.9C62.9067 18.5133 62.12 19.3533 61.56 20.42C61 21.4867 60.72 22.7 60.72 24.06C60.72 25.42 61 26.6467 61.56 27.74C62.12 28.8067 62.8933 29.6467 63.88 30.26C64.8933 30.8733 66.04 31.18 67.32 31.18Z"></path>
                    <path d="M83.6769 34.9V13.26H87.9969V17.62L87.5969 16.98C88.0769 15.5667 88.8502 14.5533 89.9169 13.94C90.9835 13.3 92.2635 12.98 93.7569 12.98H95.0769V17.1H93.1969C91.7035 17.1 90.4902 17.5667 89.5569 18.5C88.6502 19.4067 88.1969 20.7133 88.1969 22.42V34.9H83.6769Z"></path>
                    <path d="M104.649 35.38C103.182 35.38 101.889 35.1267 100.769 34.62C99.6757 34.0867 98.8224 33.3667 98.2091 32.46C97.5957 31.5267 97.2891 30.4333 97.2891 29.18C97.2891 28.0067 97.5424 26.9533 98.0491 26.02C98.5824 25.0867 99.3957 24.3 100.489 23.66C101.582 23.02 102.956 22.5667 104.609 22.3L112.129 21.06V24.62L105.489 25.78C104.289 25.9933 103.409 26.38 102.849 26.94C102.289 27.4733 102.009 28.1667 102.009 29.02C102.009 29.8467 102.316 30.5267 102.929 31.06C103.569 31.5667 104.382 31.82 105.369 31.82C106.596 31.82 107.662 31.5533 108.569 31.02C109.502 30.4867 110.222 29.78 110.729 28.9C111.236 27.9933 111.489 26.9933 111.489 25.9V20.34C111.489 19.2733 111.089 18.4067 110.289 17.74C109.516 17.0467 108.476 16.7 107.169 16.7C105.969 16.7 104.916 17.02 104.009 17.66C103.129 18.2733 102.476 19.0733 102.049 20.06L98.2891 18.18C98.6891 17.1133 99.3424 16.18 100.249 15.38C101.156 14.5533 102.209 13.9133 103.409 13.46C104.636 13.0067 105.929 12.78 107.289 12.78C108.996 12.78 110.502 13.1 111.809 13.74C113.142 14.38 114.169 15.2733 114.889 16.42C115.636 17.54 116.009 18.8467 116.009 20.34V34.9H111.689V30.98L112.609 31.1C112.102 31.98 111.449 32.74 110.649 33.38C109.876 34.02 108.982 34.5133 107.969 34.86C106.982 35.2067 105.876 35.38 104.649 35.38Z"></path>
                    <path d="M123.539 34.9V17.34H119.539V13.26H123.539V12.14C123.539 10.5133 123.872 9.15333 124.539 8.06C125.205 6.93999 126.125 6.08666 127.299 5.5C128.499 4.91333 129.872 4.62 131.419 4.62C131.712 4.62 132.045 4.64666 132.419 4.69999C132.792 4.72666 133.099 4.76666 133.339 4.81999V8.73999C133.125 8.68666 132.885 8.66 132.619 8.66C132.352 8.63333 132.139 8.62 131.979 8.62C130.779 8.62 129.819 8.9 129.099 9.45999C128.379 9.99333 128.019 10.8867 128.019 12.14V13.26H132.979V17.34H128.019V34.9H123.539Z"></path>
                    <path d="M147.334 35.14C145.067 35.14 143.307 34.5 142.054 33.22C140.8 31.94 140.174 30.14 140.174 27.82V17.34H136.374V13.26H136.974C137.987 13.26 138.774 12.9667 139.334 12.38C139.894 11.7933 140.174 10.9933 140.174 9.97999V8.3H144.694V13.26H149.614V17.34H144.694V27.62C144.694 28.3667 144.814 29.0067 145.054 29.54C145.294 30.0467 145.68 30.4467 146.214 30.74C146.747 31.0067 147.44 31.14 148.294 31.14C148.507 31.14 148.747 31.1267 149.014 31.1C149.28 31.0733 149.534 31.0467 149.774 31.02V34.9C149.4 34.9533 148.987 35.0067 148.534 35.06C148.08 35.1133 147.68 35.14 147.334 35.14Z"></path>
                    <path d="M162.185 35.38C159.971 35.38 158.025 34.8333 156.345 33.74C154.691 32.6467 153.531 31.18 152.865 29.34L156.345 27.7C156.931 28.9267 157.731 29.9 158.745 30.62C159.785 31.34 160.931 31.7 162.185 31.7C163.251 31.7 164.118 31.46 164.785 30.98C165.451 30.5 165.785 29.8467 165.785 29.02C165.785 28.4867 165.638 28.06 165.345 27.74C165.051 27.3933 164.678 27.1133 164.225 26.9C163.798 26.6867 163.358 26.5267 162.905 26.42L159.505 25.46C157.638 24.9267 156.238 24.1267 155.305 23.06C154.398 21.9667 153.945 20.7 153.945 19.26C153.945 17.9533 154.278 16.82 154.945 15.86C155.611 14.8733 156.531 14.1133 157.705 13.58C158.878 13.0467 160.198 12.78 161.665 12.78C163.638 12.78 165.398 13.2733 166.945 14.26C168.491 15.22 169.585 16.5667 170.225 18.3L166.745 19.94C166.318 18.9 165.638 18.0733 164.705 17.46C163.798 16.8467 162.771 16.54 161.625 16.54C160.638 16.54 159.851 16.78 159.265 17.26C158.678 17.7133 158.385 18.3133 158.385 19.06C158.385 19.5667 158.518 19.9933 158.785 20.34C159.051 20.66 159.398 20.9267 159.825 21.14C160.251 21.3267 160.691 21.4867 161.145 21.62L164.665 22.66C166.451 23.1667 167.825 23.9667 168.785 25.06C169.745 26.1267 170.225 27.4067 170.225 28.9C170.225 30.18 169.878 31.3133 169.185 32.3C168.518 33.26 167.585 34.02 166.385 34.58C165.185 35.1133 163.785 35.38 162.185 35.38Z"></path>
                    <path d="M176.653 34.9V29.7H181.253V34.9H176.653Z"></path>
                  </mask>
                  <path
                    d="M66.88 35.38C64.8 35.38 62.9333 34.8867 61.28 33.9C59.6533 32.8867 58.36 31.5267 57.4 29.82C56.4667 28.1133 56 26.1933 56 24.06C56 21.9267 56.48 20.0067 57.44 18.3C58.4 16.5933 59.6933 15.2467 61.32 14.26C62.9467 13.2733 64.7867 12.78 66.84 12.78C68.5733 12.78 70.1067 13.1267 71.44 13.82C72.7733 14.5133 73.8267 15.4733 74.6 16.7L73.92 17.74V4.62H78.4V34.9H74.12V30.5L74.64 31.34C73.8933 32.6467 72.8267 33.6467 71.44 34.34C70.0533 35.0333 68.5333 35.38 66.88 35.38ZM67.32 31.18C68.5733 31.18 69.6933 30.8733 70.68 30.26C71.6933 29.6467 72.48 28.8067 73.04 27.74C73.6267 26.6467 73.92 25.42 73.92 24.06C73.92 22.7 73.6267 21.4867 73.04 20.42C72.48 19.3533 71.6933 18.5133 70.68 17.9C69.6933 17.2867 68.5733 16.98 67.32 16.98C66.0667 16.98 64.9333 17.2867 63.92 17.9C62.9067 18.5133 62.12 19.3533 61.56 20.42C61 21.4867 60.72 22.7 60.72 24.06C60.72 25.42 61 26.6467 61.56 27.74C62.12 28.8067 62.8933 29.6467 63.88 30.26C64.8933 30.8733 66.04 31.18 67.32 31.18Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                  <path
                    d="M83.6769 34.9V13.26H87.9969V17.62L87.5969 16.98C88.0769 15.5667 88.8502 14.5533 89.9169 13.94C90.9835 13.3 92.2635 12.98 93.7569 12.98H95.0769V17.1H93.1969C91.7035 17.1 90.4902 17.5667 89.5569 18.5C88.6502 19.4067 88.1969 20.7133 88.1969 22.42V34.9H83.6769Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                  <path
                    d="M104.649 35.38C103.182 35.38 101.889 35.1267 100.769 34.62C99.6757 34.0867 98.8224 33.3667 98.2091 32.46C97.5957 31.5267 97.2891 30.4333 97.2891 29.18C97.2891 28.0067 97.5424 26.9533 98.0491 26.02C98.5824 25.0867 99.3957 24.3 100.489 23.66C101.582 23.02 102.956 22.5667 104.609 22.3L112.129 21.06V24.62L105.489 25.78C104.289 25.9933 103.409 26.38 102.849 26.94C102.289 27.4733 102.009 28.1667 102.009 29.02C102.009 29.8467 102.316 30.5267 102.929 31.06C103.569 31.5667 104.382 31.82 105.369 31.82C106.596 31.82 107.662 31.5533 108.569 31.02C109.502 30.4867 110.222 29.78 110.729 28.9C111.236 27.9933 111.489 26.9933 111.489 25.9V20.34C111.489 19.2733 111.089 18.4067 110.289 17.74C109.516 17.0467 108.476 16.7 107.169 16.7C105.969 16.7 104.916 17.02 104.009 17.66C103.129 18.2733 102.476 19.0733 102.049 20.06L98.2891 18.18C98.6891 17.1133 99.3424 16.18 100.249 15.38C101.156 14.5533 102.209 13.9133 103.409 13.46C104.636 13.0067 105.929 12.78 107.289 12.78C108.996 12.78 110.502 13.1 111.809 13.74C113.142 14.38 114.169 15.2733 114.889 16.42C115.636 17.54 116.009 18.8467 116.009 20.34V34.9H111.689V30.98L112.609 31.1C112.102 31.98 111.449 32.74 110.649 33.38C109.876 34.02 108.982 34.5133 107.969 34.86C106.982 35.2067 105.876 35.38 104.649 35.38Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                  <path
                    d="M123.539 34.9V17.34H119.539V13.26H123.539V12.14C123.539 10.5133 123.872 9.15333 124.539 8.06C125.205 6.93999 126.125 6.08666 127.299 5.5C128.499 4.91333 129.872 4.62 131.419 4.62C131.712 4.62 132.045 4.64666 132.419 4.69999C132.792 4.72666 133.099 4.76666 133.339 4.81999V8.73999C133.125 8.68666 132.885 8.66 132.619 8.66C132.352 8.63333 132.139 8.62 131.979 8.62C130.779 8.62 129.819 8.9 129.099 9.45999C128.379 9.99333 128.019 10.8867 128.019 12.14V13.26H132.979V17.34H128.019V34.9H123.539Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                  <path
                    d="M147.334 35.14C145.067 35.14 143.307 34.5 142.054 33.22C140.8 31.94 140.174 30.14 140.174 27.82V17.34H136.374V13.26H136.974C137.987 13.26 138.774 12.9667 139.334 12.38C139.894 11.7933 140.174 10.9933 140.174 9.97999V8.3H144.694V13.26H149.614V17.34H144.694V27.62C144.694 28.3667 144.814 29.0067 145.054 29.54C145.294 30.0467 145.68 30.4467 146.214 30.74C146.747 31.0067 147.44 31.14 148.294 31.14C148.507 31.14 148.747 31.1267 149.014 31.1C149.28 31.0733 149.534 31.0467 149.774 31.02V34.9C149.4 34.9533 148.987 35.0067 148.534 35.06C148.08 35.1133 147.68 35.14 147.334 35.14Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                  <path
                    d="M162.185 35.38C159.971 35.38 158.025 34.8333 156.345 33.74C154.691 32.6467 153.531 31.18 152.865 29.34L156.345 27.7C156.931 28.9267 157.731 29.9 158.745 30.62C159.785 31.34 160.931 31.7 162.185 31.7C163.251 31.7 164.118 31.46 164.785 30.98C165.451 30.5 165.785 29.8467 165.785 29.02C165.785 28.4867 165.638 28.06 165.345 27.74C165.051 27.3933 164.678 27.1133 164.225 26.9C163.798 26.6867 163.358 26.5267 162.905 26.42L159.505 25.46C157.638 24.9267 156.238 24.1267 155.305 23.06C154.398 21.9667 153.945 20.7 153.945 19.26C153.945 17.9533 154.278 16.82 154.945 15.86C155.611 14.8733 156.531 14.1133 157.705 13.58C158.878 13.0467 160.198 12.78 161.665 12.78C163.638 12.78 165.398 13.2733 166.945 14.26C168.491 15.22 169.585 16.5667 170.225 18.3L166.745 19.94C166.318 18.9 165.638 18.0733 164.705 17.46C163.798 16.8467 162.771 16.54 161.625 16.54C160.638 16.54 159.851 16.78 159.265 17.26C158.678 17.7133 158.385 18.3133 158.385 19.06C158.385 19.5667 158.518 19.9933 158.785 20.34C159.051 20.66 159.398 20.9267 159.825 21.14C160.251 21.3267 160.691 21.4867 161.145 21.62L164.665 22.66C166.451 23.1667 167.825 23.9667 168.785 25.06C169.745 26.1267 170.225 27.4067 170.225 28.9C170.225 30.18 169.878 31.3133 169.185 32.3C168.518 33.26 167.585 34.02 166.385 34.58C165.185 35.1133 163.785 35.38 162.185 35.38Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                  <path
                    d="M176.653 34.9V29.7H181.253V34.9H176.653Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    mask="url(#path-2-inside-1_171_305)"
                  ></path>
                </svg>
              </a>
            </div>

            <div
              data-nav-overlay
              aria-hidden="true"
              className="fixed inset-0 hidden bg-box-bg bg-opacity/50 backdrop-blur-xl lg:hidden"
            ></div>
            <div
              data-navbar
              className="bg-body border-x-box-border absolute top-full flex h-0 w-full flex-col gap-x-4 gap-y-6 overflow-hidden border-x duration-300 ease-linear lg:relative lg:top-0 lg:!h-auto lg:scale-y-100 lg:flex-row lg:items-center lg:justify-between lg:border-x-0 lg:bg-transparent"
            ></div>

            <div className="flex items-center min-w-max gap-x-3">
              {/* <SignInButton mode="modal">
              <Button
                className="border-box-border flex w-full items-center rounded-full border px-4 py-3.5  focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1"
                variant="outline"
              >
                <img src="/images/google.svg" alt="google" />
                Sign In With Google
              </Button>
            </SignInButton> */}
              <a
                href="https://www.producthunt.com/posts/mixim-drafts?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mixim&#0045;drafts"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=402641&theme=light"
                  alt="Mixim&#0032;Drafts - Simple&#0032;yet&#0032;powerful&#0032;note&#0045;taking&#0032;app&#0032;for&#0032;productive&#0032;minds | Product Hunt"
                  className="h-[48px] w-[250px]"
                />
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>

        <section className="relative p-4 pt-32 lg:pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <div className="flex flex-col items-center mx-auto text-center lg:flex-1 lg:items-start lg:py-7 xl:py-8">
              <div className="relative px-3 py-1 mx-auto mb-4 text-sm leading-6 border rounded-full text-heading-3 dark:ring-primary border-box-border hover:border-border">
                <a
                  href="https://youtu.be/cY_0OmK3gaU"
                  target="_blank"
                  className="font-semibold text-heading-1"
                  rel="noreferrer"
                >
                  <span className="block text-heading-3 lg:inline">
                    🥳 Introducing Mixim Drafts{" "}
                    <span aria-hidden="true"> &rarr;</span>
                  </span>
                </a>
              </div>
              <h1 className="mx-auto font-semibold tracking-tighter text-heading-1 text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-5xl/tight">
                Simple yet powerful
              </h1>
              <h1 className="mx-auto font-semibold tracking-tighter text-heading-1 text-3xl/tight sm:text-4xl/tight md:text-5xl/tight xl:text-6xl/tight">
                Note-taking app for productive minds.
              </h1>
              <div className="max-w-3xl mx-auto mt-8">
                Simplify your note-taking experience with Drafts, the
                minimalistic app designed to help you focus on what matters
                most: <strong>your ideas.</strong>
              </div>
              <div className="flex mx-auto mt-10">
                <SignInButton mode="modal">
                  <Button
                    className="flex items-center w-full px-8 py-6 border rounded-full shadow-xl border-box-border focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1"
                    variant="outline"
                  >
                    <img src="/images/google.svg" alt="google" />
                    Sign In With Google
                  </Button>
                </SignInButton>
              </div>

              <div className="relative items-center w-full p-8 py-12 mx-auto max-w-7xl">
                <div className="p-4 bg-box-bg rounded-3xl">
                  <img
                    alt=""
                    className="relative object-cover w-full rounded shadow-2xl lg:rounded-2xl"
                    src="/images/MiximDraftScreenshot.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="p-4 mt-24 space-y-10 md:sapce-y-24">
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <div className="text-2xl font-semibold text-heading-1 sm:text-3xl md:text-4xl">
                Unveiling Our Powerful Features
              </div>
              <div>
                Experience the perfect harmony of simplicity and functionality
                with Drafts innovative features.
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="relative p-5 overflow-hidden border shadow-lg border-box-border bg-box-bg shadow-box-shadow rounded-3xl dark:border-gray-600 sm:p-6 lg:p-8">
                {/* <div className="relative p-3 bg-gray-100 text-heading-1 w-max rounded-xl dark:bg-gray-900">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M45.1278 12.4948C49.0214 7.45823 56.4524 6.98459 60.9538 11.4861C65.4548 15.987 64.9819 23.417 59.9466 27.3109L35.9375 45.8781C35.4853 46.2278 34.8436 46.187 34.4393 45.7827L26.6612 38.0046C26.2569 37.6003 26.216 36.9586 26.5657 36.5063L45.1278 12.4948Z"
                      stroke="#C2CCDE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M39.0328 41.8909L30.5475 33.4056"
                      stroke="#C2CCDE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M26.7291 38.0725L34.3658 45.7092C34.6309 45.9743 34.7459 46.3543 34.6724 46.7218L33.7797 51.1856C33.094 54.6139 30.6036 57.4009 27.2738 58.4665L13.1699 62.9797C12.1172 63.3166 10.9644 63.0371 10.1828 62.2555C9.40117 61.4739 9.12169 60.3211 9.45858 59.2684L13.9718 45.1645C15.0374 41.8347 17.8244 39.3443 21.2527 38.6586L25.7165 37.7659C26.084 37.6924 26.464 37.8074 26.7291 38.0725Z"
                      stroke="#C2CCDE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.1827 62.2555L21.2136 51.2246"
                      stroke="#C2CCDE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20.5925 48.9065C20.1143 50.6911 21.7473 52.324 23.5319 51.8459V51.8459C25.3165 51.3677 25.9142 49.137 24.6078 47.8306V47.8306C23.3014 46.5242 21.0707 47.1219 20.5925 48.9065V48.9065Z"
                      stroke="#C2CCDE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.55566 72H21.5641C23.4206 72 25.2197 71.3562 26.6548 70.1784L30.4354 67.0754C31.197 66.4503 32.2941 66.4503 33.0557 67.0754L36.8408 70.1821C38.2729 71.3576 40.0683 72 41.921 72H42.6311C45.5851 72 48.221 70.1452 49.2184 67.3646L55.2676 50.5C55.4487 49.9952 56.1626 49.9952 56.3437 50.5L61.5234 64.9404C63.0424 69.1751 67.0568 72 71.5557 72H72.5557"
                      stroke="#C2CCDE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div> */}
                <div className="relative mt-6 space-y-4">
                  <h2 className="text-lg font-semibold text-heading-2 md:text-xl">
                    {" "}
                    Effortless Note-taking
                  </h2>
                  <div>
                    Experience the joy of capturing your thoughts effortlessly
                    with our intuitive block-based note-taking system. From
                    jotting down ideas to organizing your daily tasks, Drafts
                    makes it seamless and enjoyable.
                  </div>
                </div>
                <span className="absolute w-32 rounded-full bg-primary/10 -bottom-16 -right-16 aspect-square"></span>
              </div>
              <div className="relative p-5 overflow-hidden border shadow-lg border-box-border bg-box-bg shadow-box-shadow rounded-3xl dark:border-gray-600 sm:p-6 lg:p-8">
                {/* <div className="relative p-3 bg-gray-300 text-heading-1 w-max rounded-xl dark:bg-gray-600">
                  <svg
                    fill="none"
                    width="80"
                    height="80"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                    ></path>
                  </svg>
                </div> */}
                <div className="relative mt-6 space-y-4">
                  <h2 className="text-lg font-semibold text-heading-2 md:text-xl">
                    Offline Accessibility with PWA
                  </h2>
                  <div>
                    Stay productive even when you are offline with Drafts
                    powerful Progressive Web App (PWA) functionality. Access
                    your notes, create new drafts, and edit existing ones
                    seamlessly, anytime and anywhere, without the need for an
                    internet connection.
                  </div>
                </div>
                <span className="absolute w-32 rounded-full bg-primary/10 -bottom-16 -right-16 aspect-square"></span>
              </div>
              <div className="relative p-5 overflow-hidden border shadow-lg border-box-border bg-box-bg shadow-box-shadow rounded-3xl dark:border-gray-600 sm:p-6 lg:p-8">
                {/* <div className="relative p-3 bg-gray-300 text-heading-1 w-max rounded-xl dark:bg-gray-950">
                  tt
                </div> */}
                <div className="relative mt-6 space-y-4">
                  <h2 className="text-lg font-semibold text-heading-2 md:text-xl">
                    Free to Use and Grow with You
                  </h2>
                  <div>
                    Experience the freedom of using Drafts at no cost, with
                    unlimited access to our core features. As your note-taking
                    needs evolve, unlock additional premium features that cater
                    to your specific requirements. Drafts grows with you,
                    ensuring you have the tools you need at every stage of your
                    personal and professional journey.
                  </div>
                </div>
                <span className="absolute w-32 rounded-full bg-primary/10 -bottom-16 -right-16 aspect-square"></span>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full py-12 mt-12 text-center border-t dark:border-gray-600 ">
          <p className="text-gray-500">
            Project by:{" "}
            <a
              className="font-medium text-gray-800 transition-colors hover:underline"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @anjil, @anup, @bikash, @bijay
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
