import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ひかりの',
  description: 'ひかりのサービスのプライバシーポリシーについて',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 個人情報の収集について</h2>
          <p className="mb-4">
            当サービス「ひかりの」では、サービスの提供にあたり、以下の個人情報を収集いたします。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>メールアドレス</li>
            <li>ユーザー名</li>
            <li>サービス利用履歴</li>
            <li>アクセスログ</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 個人情報の利用目的</h2>
          <p className="mb-4">
            収集した個人情報は、以下の目的で利用いたします。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>サービスの提供・運営</li>
            <li>ユーザーサポート</li>
            <li>サービス改善のための分析</li>
            <li>重要なお知らせの配信</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 個人情報の第三者提供</h2>
          <p className="mb-4">
            当サービスでは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 個人情報の保護</h2>
          <p className="mb-4">
            当サービスでは、個人情報の漏洩、滅失、毀損を防止するため、適切な安全管理措置を講じております。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. お問い合わせ</h2>
          <p className="mb-4">
            本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
          </p>
          <p className="mb-4">
            サービス運営者: ひかりの運営チーム
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. プライバシーポリシーの変更</h2>
          <p className="mb-4">
            本プライバシーポリシーは、必要に応じて変更することがあります。
            変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <div className="mt-12 text-sm text-gray-600">
          <p>制定日: 2024年12月21日</p>
          <p>最終更新日: 2024年12月21日</p>
        </div>
      </div>
    </div>
  )
}