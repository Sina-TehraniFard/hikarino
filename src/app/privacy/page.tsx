import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ヒカリノ',
  description: 'ヒカリノサービスのプライバシーポリシーについて',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          ホームに戻る
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 個人情報の収集について</h2>
          <p className="mb-4">
            当サービス「ヒカリノ」では、サービスの提供にあたり、以下の個人情報を収集いたします。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>メールアドレス</li>
            <li>ユーザー名</li>
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
            サービス運営者: sina@scriptlab.jp
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
          <p>制定日: 2025/09/21</p>
        </div>
      </div>
    </div>
  )
}