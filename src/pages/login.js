import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
// function used for logging customer {provider} => )destructuring
export default function Login({ providers }) {
  const { data, session } = useSession();
  console.log({ data, session });
  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div>
          <button
            onClick={async () => {
              await signIn(provider.id);
            }}
            className="bg-twitterWhite pr-5 py-2 text-black text-xl rounded-full flex items-center"
          >
            <Image
              className="h-8 w-16"
              src="/google.svg"
              alt="Vercel Logo"
              width={100}
              height={100}
              priority
            />
            Sigin in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

// Below function is used to provide all the provider such as google, github,facebook, etc.. which are used in login in and signing in.
export async function getServerSideProps(context) {
  // below variable will hold all the providers used for login/signup from next-auth class.
  const providers = await getProviders();
  console.log(providers);
  // now this retrun statement will be used to pass this provider into the required file (Login)
  return {
    props: { providers },
  };
}
