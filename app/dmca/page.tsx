export const metadata = {
  title: "DMCA / Copyright",
  description: "MediaSave copyright and DMCA complaint policy.",
};

export default function DmcaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">DMCA / Copyright Policy</h1>

      <div className="space-y-6 text-gray-700 leading-7">
        <p>
          Last updated: September 12, 2026
        </p>

        <p>
          MediaSave respects copyright and intellectual property rights.
          This page explains how copyright owners or authorized representatives
          can contact us regarding content that they believe infringes their
          rights.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          1. Copyright Complaints
        </h2>

        <p>
          If you believe that material processed or made accessible through
          MediaSave infringes your copyright, please send a copyright complaint
          to:
        </p>

        <p>
          <a
            href="mailto:support.mediasave@gmail.com"
            className="font-semibold underline"
          >
            support.mediasave@gmail.com
          </a>
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          2. Information to Include
        </h2>

        <p>
          To help us review a complaint, please include the following
          information where applicable:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Identification of the copyrighted work.</li>
          <li>The URL or other location of the material at issue.</li>
          <li>Your name and contact information.</li>
          <li>
            A statement explaining why you believe the material infringes
            your copyright.
          </li>
          <li>
            A statement that the information provided is accurate and that
            you are the copyright owner or authorized to act on the owner's
            behalf.
          </li>
          <li>Your electronic or physical signature.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900">
          3. Review of Complaints
        </h2>

        <p>
          We may review properly submitted copyright complaints and take
          appropriate action where necessary. This may include restricting
          access to a relevant processing route or other reasonable measures.
        </p>

        <p>
          Submitting a false or misleading copyright complaint may have legal
          consequences.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          4. User Responsibility
        </h2>

        <p>
          MediaSave does not claim ownership of media submitted by users.
          Users are responsible for ensuring that they have the necessary
          rights or permissions to process or download content.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          5. Contact
        </h2>

        <p>
          Copyright-related notices should be sent to
          <a
            href="mailto:support.mediasave@gmail.com"
            className="font-semibold underline"
          >
            support.mediasave@gmail.com
          </a>.
        </p>
      </div>
    </main>
  );
}
