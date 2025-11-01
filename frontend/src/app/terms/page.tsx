import { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | ヒカリノ",
  description: "ヒカリノサービスの利用規約について",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">利用規約</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第1条（適用）</h2>
          <p className="mb-4">
            本利用規約（以下「本規約」といいます）は、ヒカリノ（以下「当サービス」といいます）の利用に関する条件を、
            当サービスを利用するすべてのユーザー（以下「ユーザー」といいます）と当サービス運営者（以下「運営者」といいます）との間で定めるものです。
          </p>
          <p className="mb-4">
            ユーザーは、本規約に同意した上で、当サービスを利用するものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第2条（サービス内容）</h2>
          <p className="mb-4">
            当サービスは、AI技術を活用したタロット占いサービスを提供します。
            ユーザーは本サービスを通じて、タロットカードによる占い結果を受け取ることができます。
          </p>
          <p className="mb-4">
            当サービスの占い結果は、娯楽目的で提供されるものであり、
            医療、法律、財務などの専門的なアドバイスを提供するものではありません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第3条（利用登録）</h2>
          <p className="mb-4">
            ユーザーは、当サービスの利用にあたり、運営者が定める方法により利用登録を行うものとします。
          </p>
          <p className="mb-4">
            運営者は、以下のいずれかに該当する場合、利用登録を承認しないことがあります。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>虚偽の情報を登録した場合</li>
            <li>
              過去に本規約違反により利用停止等の措置を受けたことがある場合
            </li>
            <li>その他、運営者が不適切と判断した場合</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第4条（禁止事項）</h2>
          <p className="mb-4">
            ユーザーは、当サービスの利用にあたり、以下の行為を行ってはなりません。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              運営者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
            </li>
            <li>犯罪行為に関連する行為または公序良俗に反する行為</li>
            <li>暴力的または性的な表現を含む不適切なコンテンツの投稿</li>
            <li>運営情報や開発者情報を不正に取得しようとする行為</li>
            <li>当サービスの運営を妨害する行為</li>
            <li>不正アクセスまたはこれを試みる行為</li>
            <li>他のユーザーまたは第三者になりすます行為</li>
            <li>災害予測や政治的活動に関する占いの要求</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            第5条（料金および支払い）
          </h2>
          <p className="mb-4">
            ユーザーは、当サービスの有料機能を利用する場合、運営者が定める料金を支払うものとします。
          </p>
          <p className="mb-4">
            支払われた料金は、以下の場合を除き、返金されません。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              運営者の責めに帰すべき事由により、サービスが提供されなかった場合
            </li>
          </ul>
          <p className="mb-4">
            なお、ユーザーが本規約に違反した入力内容により占いが実行されなかった場合、
            返金の対象とはなりませんのでご注意ください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第6条（知的財産権）</h2>
          <p className="mb-4">
            当サービスに関する知的財産権はすべて運営者または運営者にライセンスを許諾している者に帰属します。
          </p>
          <p className="mb-4">
            ユーザーは、当サービスを通じて得られた占い結果を私的利用の範囲内で利用することができますが、
            商用利用や第三者への譲渡・販売等は禁止されています。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第7条（免責事項）</h2>
          <p className="mb-4">
            運営者は、当サービスの内容の正確性、完全性、有用性等について、いかなる保証も行いません。
          </p>
          <p className="mb-4">
            当サービスの利用により生じた損害について、運営者は一切の責任を負いません。
            ただし、運営者の故意または重過失による場合を除きます。
          </p>
          <p className="mb-4">
            占い結果はAIによって生成されるものであり、その解釈や行動の判断は
            ユーザー自身の責任において行うものとします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            第8条（サービスの変更・終了）
          </h2>
          <p className="mb-4">
            運営者は、ユーザーへの事前の通知なく、当サービスの内容を変更または終了することができます。
          </p>
          <p className="mb-4">
            運営者は、サービスの変更または終了によりユーザーに生じた損害について、一切の責任を負いません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第9条（利用停止）</h2>
          <p className="mb-4">
            運営者は、ユーザーが以下のいずれかに該当する場合、事前の通知なく、
            当該ユーザーの当サービス利用を停止することができます。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>本規約のいずれかの条項に違反した場合</li>
            <li>登録情報に虚偽の事実があることが判明した場合</li>
            <li>その他、運営者が当サービスの利用を適当でないと判断した場合</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">第10条（規約の変更）</h2>
          <p className="mb-4">
            運営者は、必要に応じて本規約を変更することができます。
          </p>
          <p className="mb-4">
            変更後の利用規約は、本ページに掲載した時点で効力を生じるものとします。
            変更後も当サービスを継続して利用した場合、変更後の規約に同意したものとみなします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            第11条（準拠法・管轄裁判所）
          </h2>
          <p className="mb-4">
            本規約の解釈にあたっては、日本法を準拠法とします。
          </p>
          <p className="mb-4">
            当サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            第12条（お問い合わせ）
          </h2>
          <p className="mb-4">
            本規約に関するお問い合わせは、以下までご連絡ください。
          </p>
          <p className="mb-4">サービス運営者: sina@scriptlab.jp</p>
        </section>

        <div className="mt-12 text-sm text-gray-600">
          <p>制定日: 2025/10/18</p>
        </div>
      </div>
    </div>
  );
}
