import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | ヒカリノ',
  description: 'ヒカリノサービスの特定商取引法に基づく表記',
}

export default function TokushoPage() {
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
      <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">販売業者</h2>
          <p className="mb-4">
            スクリプトラボ
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">代表責任者</h2>
          <p className="mb-4">
            テヘラニ ファルド スィナ
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">所在地</h2>
          <p className="mb-4">
            〒175-0092 東京都板橋区赤塚6丁目34番
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">電話番号</h2>
          <p className="mb-4">
            080-3307-3735
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">メールアドレス</h2>
          <p className="mb-4">
            tf.sina.system@gmail.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">サイトURL</h2>
          <p className="mb-4">
            https://hikarino.jp
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">商品の販売価格</h2>
          <p className="mb-4">
            各商品ページをご参照ください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">商品代金以外に必要な料金</h2>
          <p className="mb-4">
            商品代金以外の料金は発生いたしません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">支払方法</h2>
          <p className="mb-4">
            クレジットカード決済（Stripe）
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">支払時期</h2>
          <p className="mb-4">
            商品注文時にお支払いが確定します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">商品の引渡時期</h2>
          <p className="mb-4">
            決済完了後、即時に商品（コイン）が付与されます。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">返品・交換・キャンセルについて</h2>
          <p className="mb-4">
            当サービスはデジタルコンテンツ（占いサービス用コイン）の販売であり、商品の性質上、お客様のご都合による返品・交換・キャンセルはお受けできません。
          </p>
          <p className="mb-4">
            ただし、以下の場合には返金対応をいたします：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>システムの不具合により、購入したコインが正常に付与されなかった場合</li>
            <li>決済エラーにより二重に課金された場合</li>
            <li>その他、当サービスの責に帰すべき事由により商品が提供できなかった場合</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">返金ポリシー</h2>
          <p className="mb-4">
            上記の返品・交換・キャンセル事由に該当する場合、お支払いいただいた金額の全額を返金いたします。
            返金は、お客様のご連絡から30日以内に、決済時にご利用いただいたクレジットカードへの返金処理を行います。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">お問い合わせ受付時間</h2>
          <p className="mb-4">
            メールでのお問い合わせは24時間受け付けております。<br />
            順次対応させていただきます。
          </p>
        </section>

        <div className="mt-12 text-sm text-gray-600">
          <p>制定日: 2025/10/12</p>
        </div>
      </div>
    </div>
  )
}
