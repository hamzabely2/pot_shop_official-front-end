import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Example() {
  return (
      <div className="bg-white">
        <div className="mx-auto max-w-8xl px-6  py-16 lg:px-8">
          <div className="relative justify-center mb-3 flex items-center">
            <div className=""><img alt="image de decoration" className="w-40 mr-4" src="/img/decoration/decoration_right.jpg"></img></div>
            <h2 className="text_nav leading-7 text.black sm:truncate sm:text-3xl ">Contact</h2>
            <div className=""><img alt="image de decoration" className="w-40 ml-4" src="/img/decoration/decoration_left.jpg"/></div>
          </div>
          <div className="mx-auto  md:grid md:max-w-none md:grid-cols-2 md:gap-8">
            <div>
              <div className="relative rounded-2xl h-80 bg-white overflow-hidden">
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    loop
                    autoPlay
                    muted
                >
                  <source src="/video/pexels-kelly-lacy-5634000%20(2160p).mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

            </div>
            <div className="mt-12 sm:mt-16 md:mt-0">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">Technical Support</h2>
              <div className="mt-3">
                <p className="text-lg text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni, repellat error corporis doloribus
                  similique, voluptatibus numquam quam, quae officiis facilis.
                </p>
              </div>
              <div className="mt-9">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>+1 (555) 123 4567</p>
                    <p className="mt-1">Mon-Fri 8am to 6pm PST</p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 text-base text-gray-500">
                    <p>support@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
