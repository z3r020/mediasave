export const metadata = {
  title: "Contact",
  description: "Contact MediaSave for support, copyright concerns, and general questions.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact MediaSave</h1>

      <div className="space-y-6 text-gray-700 leading-7">
        <p>
          If you have questions, need support, or want to report an issue
          related to MediaSave, you can contact us by email.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          General Support
        </h2>

        <p>
          Email:
          <a
            href="mailto:support.mediasave@gmail.com"
            className="font-semibold underline"
          >
            support.mediasave@gmail.com
          </a>
        </p>

        <p>
          When contacting us, please provide enough information for us to
          understand and respond to your request.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          Copyright and DMCA
        </h2>

        <p>
          For copyright complaints or requests concerning allegedly
          infringing content, please review our
          <a href="/dmca" className="font-semibold underline">
            DMCA / Copyright Policy
          </a>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          Response Times
        </h2>

        <p>
          We aim to review support and copyright-related messages within a
          reasonable period. Response times may vary depending on the nature
          and complexity of the request.
        </p>
      </div>
    </main>
  );
}
