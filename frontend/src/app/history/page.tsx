"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/ui/Sidebar";
import PageBackground from "@/components/ui/PageBackground";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUserFortunes } from "@/lib/firestore/fortune";
import { useCoinContext } from "@/contexts/CoinContext";
import { useCoinAnimation } from "@/hooks/useCoinAnimation";
import { User, FortuneHistory } from "@/types";
import LoginModal from "@/components/LoginModal";
import CoinPurchaseModal from "@/components/CoinPurchaseModal";
import MiniTarotCard from "@/components/ui/MiniTarotCard";
import MessageDialog from "@/components/ui/MessageDialog";
import DateInput from "@/components/ui/DateInput";
import PaginationComponent from "@/components/ui/PaginationComponent";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { analyzeFortuneHistory } from "@/lib/fortuneAnalytics";
import { useFortuneFilters } from "@/hooks/useFortuneFilters";
import { useFortuneDelete } from "@/hooks/useFortuneDelete";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function HistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [fortunes, setFortunes] = useState<FortuneHistory[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "single" | "all";
    fortuneId?: string;
  } | null>(null);
  const router = useRouter();
  const { coins, refreshCoins } = useCoinContext();
  const { displayCoins } = useCoinAnimation(coins, user?.uid);
  const { filterByText, filterByCard, filterByDateRange } = useFortuneFilters();
  const {
    isDeleting,
    error: deleteError,
    handleDeleteFortune,
    handleDeleteAllFortunes,
  } = useFortuneDelete();

  const itemsPerPage = 10;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
        getUserFortunes(user.uid)
          .then(setFortunes)
          .catch((error) => {
            console.error("占い履歴の取得エラー:", error);
            setErrorMessage(
              "占い履歴の読み込みに失敗しました。ページを再読み込みしてください。"
            );
            setShowErrorDialog(true);
          });
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      setErrorMessage("ログアウトに失敗しました。もう一度お試しください。");
      setShowErrorDialog(true);
    }
  };

  const handleCoinModalClose = async () => {
    await refreshCoins(true);
    setShowCoinModal(false);
  };

  // ページリセット用の共通ロジック
  const resetToFirstPage = () => {
    setCurrentPage(1);
    setExpandedId(null);
  };

  // 日付フォーマット（10行未満なのでコンポーネント内でOK）
  const formatDate = (timestamp?: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return "日時不明";
    return format(new Date(timestamp.seconds * 1000), "yyyy年MM月dd日 HH:mm", {
      locale: ja,
    });
  };

  // カード名抽出（10行未満なのでコンポーネント内でOK）
  const allCardNames = useMemo(() => {
    return [
      ...new Set(
        fortunes.flatMap((fortune) =>
          fortune.cards.map((card) => card.cardName)
        )
      ),
    ].sort();
  }, [fortunes]);

  // フィルタリング（複合条件） - useMemoで最適化
  const filteredFortunes = useMemo(() => {
    return fortunes.filter(
      (fortune) =>
        filterByText(fortune, searchQuery) &&
        filterByCard(fortune, selectedCard) &&
        filterByDateRange(fortune, dateRange)
    );
  }, [
    fortunes,
    searchQuery,
    selectedCard,
    dateRange,
    filterByText,
    filterByCard,
    filterByDateRange,
  ]);

  // ページネーション計算（10行未満なのでコンポーネント内でOK）
  const totalPages = Math.ceil(filteredFortunes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFortunes = filteredFortunes.slice(startIndex, endIndex);

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null); // ページ変更時に展開状態をリセット
    // 検索ボックスまでスクロール
    const searchElement = document.getElementById("search-section");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 検索時の処理（10行未満なのでコンポーネント内でOK）
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    resetToFirstPage();
  };

  // フィルタクリア（10行未満なのでコンポーネント内でOK）
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCard("");
    setDateRange({ start: "", end: "" });
    resetToFirstPage();
  };

  // フィルタが適用されているかチェック（1行なのでコンポーネント内でOK）
  const hasActiveFilters =
    searchQuery || selectedCard || dateRange.start || dateRange.end;

  // 削除確認ダイアログを開く
  const openDeleteConfirm = (type: "single" | "all", fortuneId?: string) => {
    setDeleteTarget({ type, fortuneId });
    setShowDeleteConfirm(true);
  };

  // 削除実行
  const executeDelete = async () => {
    if (!user || !deleteTarget) return;

    let success = false;
    if (deleteTarget.type === "single" && deleteTarget.fortuneId) {
      success = await handleDeleteFortune(user.uid, deleteTarget.fortuneId);
    } else if (deleteTarget.type === "all") {
      success = await handleDeleteAllFortunes(user.uid);
    }

    if (success) {
      const updatedFortunes = await getUserFortunes(user.uid);
      setFortunes(updatedFortunes);
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
      setExpandedId(null);
      setCurrentPage(1);
    } else if (deleteError) {
      setErrorMessage(deleteError);
      setShowErrorDialog(true);
    }
  };

  return (
    <main className="flex min-h-screen relative overflow-hidden">
      {/* PC版サイドバー（768px以上で表示） */}
      {user && (
        <div className="hidden md:block">
          <Sidebar
            user={user}
            onLogout={handleLogout}
            onRequireLogin={() => setShowLogin(true)}
            displayCoins={displayCoins}
            onCoinClick={() => setShowCoinModal(true)}
          />
        </div>
      )}

      <PageBackground />

      <div className={`flex-1 ${user ? "md:ml-72" : ""}`}>
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-purple-200/30 shadow-2xl min-h-screen relative">
          <div className="px-6 space-y-6 pb-12">
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

            {user && (
              <Header
                user={user}
                coins={coins}
                onLogout={handleLogout}
                onRequireLogin={() => setShowLogin(true)}
                userId={user.uid}
                onCoinClick={() => setShowCoinModal(true)}
              />
            )}

            <div className="w-full max-w-3xl mx-auto">
              {/* 統計情報セクション */}
              {fortunes.length > 0 && (
                <div className="mb-8 animate-fadeIn">
                  {(() => {
                    const stats = analyzeFortuneHistory(fortunes);
                    return (
                      <>
                        {/* メインビジュアル */}
                        <div className="relative h-32 mb-6 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-80" />
                          <div className="absolute inset-0 bg-black/30" />
                          <div className="relative z-10 h-full flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="text-4xl mb-1">⭐</div>
                              <p className="text-sm opacity-90">
                                {stats.specialInsight}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 統計カード */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                            <p className="text-xs text-gray-600 mb-1">
                              総占い回数
                            </p>
                            <p className="text-2xl font-bold text-purple-600">
                              {stats.totalReadings}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">回</p>
                          </div>

                          {stats.mostFrequentCard && (
                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                              <p className="text-xs text-gray-600 mb-1">
                                最頻出カード
                              </p>
                              <p className="text-lg font-bold text-blue-600">
                                {stats.mostFrequentCard.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {stats.mostFrequentCard.count}回出現
                              </p>
                            </div>
                          )}

                          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                            <p className="text-xs text-gray-600 mb-1">
                              利用頻度
                            </p>
                            <p className="text-lg font-bold text-amber-600">
                              {stats.readingFrequency.average}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">間隔</p>
                          </div>

                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                            <p className="text-xs text-gray-600 mb-1">
                              主要属性
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {stats.dominantElement.element}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {stats.dominantElement.percentage}%
                            </p>
                          </div>
                        </div>

                        {/* 洞察メッセージ */}
                        <div className="text-center mb-8">
                          <p className="text-sm text-gray-600 italic">
                            {stats.dominantElement.meaning}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* タイムラインヘッダーと検索・フィルター */}
              <div id="search-section" className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-light text-gray-700 tracking-wider">
                    {fortunes.length === 0
                      ? "利用履歴はありません"
                      : "利用履歴"}
                  </h2>
                  {fortunes.length > 0 && (
                    <button
                      onClick={() => openDeleteConfirm("all")}
                      className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors duration-200 flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      すべて削除
                    </button>
                  )}
                </div>

                {/* 検索ボックス */}
                {fortunes.length > 0 && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="質問や結果から検索..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => handleSearch("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* フィルターセクション */}
                {fortunes.length > 0 && (
                  <div className="space-y-3">
                    {/* フィルター開閉ボタン */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
                      >
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>
                        詳細フィルター
                        {hasActiveFilters && (
                          <span className="ml-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                            適用中
                          </span>
                        )}
                      </button>

                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
                        >
                          すべてクリア
                        </button>
                      )}
                    </div>

                    {/* フィルター詳細 */}
                    {showFilters && (
                      <div className="p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-200">
                        <div className="space-y-4">
                          {/* カード種類フィルター */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              カード種類
                            </label>
                            <select
                              value={selectedCard}
                              onChange={(e) => {
                                setSelectedCard(e.target.value);
                                resetToFirstPage();
                              }}
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                            >
                              <option value="">すべてのカード</option>
                              {allCardNames.map((cardName) => (
                                <option key={cardName} value={cardName}>
                                  {cardName}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* 日付範囲フィルター */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              期間指定
                            </label>
                            <div className="space-y-2">
                              <div className="flex flex-col sm:flex-row gap-2">
                                <DateInput
                                  label="開始日"
                                  value={dateRange.start}
                                  onChange={(value) => {
                                    setDateRange((prev) => ({
                                      ...prev,
                                      start: value,
                                    }));
                                    resetToFirstPage();
                                  }}
                                />
                                <DateInput
                                  label="終了日"
                                  value={dateRange.end}
                                  onChange={(value) => {
                                    setDateRange((prev) => ({
                                      ...prev,
                                      end: value,
                                    }));
                                    resetToFirstPage();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* フィルター結果の表示 */}
              {hasActiveFilters && (
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-700">
                    {filteredFortunes.length > 0 ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {filteredFortunes.length}件の結果が見つかりました
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        指定した条件に一致する結果が見つかりませんでした
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* タイムライン表示 */}
              <div className="relative">
                {/* 縦のタイムライン - PC版 */}
                {paginatedFortunes.length > 0 && (
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-purple-200 to-transparent" />
                )}

                {/* 縦のタイムライン - モバイル版（左端） */}
                {paginatedFortunes.length > 0 && (
                  <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-purple-200 to-transparent" />
                )}

                <div className="space-y-8">
                  {paginatedFortunes.map((fortune, index) => (
                    <div
                      key={fortune.id}
                      className="relative animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* タイムラインノード - PC版 */}
                      <div className="hidden md:block absolute left-8 -translate-x-1/2">
                        <div className="relative">
                          <div className="w-4 h-4 bg-purple-500 rounded-full shadow-lg" />
                          <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30" />
                        </div>
                      </div>

                      {/* タイムラインノード - モバイル版（左端、小さめ） */}
                      <div className="md:hidden absolute left-4 -translate-x-1/2 top-4">
                        <div className="relative">
                          <div className="w-3 h-3 bg-purple-500 rounded-full shadow-md" />
                          <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30" />
                        </div>
                      </div>

                      {/* カード本体 - レスポンシブマージン */}
                      <div className="ml-8 md:ml-16 border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200">
                        <button
                          className="w-full p-4 text-left hover:bg-gray-50 transition"
                          onClick={() =>
                            setExpandedId(
                              expandedId === fortune.id ? null : fortune.id
                            )
                          }
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-gray-500">
                                  {formatDate(fortune.timestamp)}
                                </span>
                              </div>
                              <blockquote className="text-lg font-medium text-gray-800 italic">
                                「{fortune.question}」
                              </blockquote>

                              {/* ミニカードプレビュー */}
                              <div className="flex gap-2 mt-3 md:justify-center">
                                {fortune.cards.map((card, cardIndex) => (
                                  <MiniTarotCard
                                    key={cardIndex}
                                    card={{
                                      name: card.cardName,
                                      imagePath: "",
                                    }}
                                    isReversed={card.isReversed}
                                    delay={cardIndex * 50}
                                  />
                                ))}
                              </div>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                                expandedId === fortune.id ? "rotate-180" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>
                        <div
                          className={`grid transition-all duration-200 ease-in-out ${
                            expandedId === fortune.id
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="p-6 border-t border-gray-200 space-y-4">
                              {/* 占い結果 */}
                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                                <h3 className="text-sm font-medium text-purple-700 mb-3">
                                  結果
                                </h3>
                                <div className="prose prose-sm max-w-none">
                                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                    {fortune.result}
                                  </p>
                                </div>
                              </div>

                              {/* 削除ボタン */}
                              <div className="flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDeleteConfirm("single", fortune.id);
                                  }}
                                  className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  この履歴を削除
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 空状態 */}
              {fortunes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">⭐</div>
                  <p className="text-gray-500">利用記録がありません</p>
                </div>
              )}

              {/* 下部ページネーション */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            <CoinPurchaseModal
              isOpen={showCoinModal}
              onClose={handleCoinModalClose}
              uid={user?.uid}
            />

            <MessageDialog
              isOpen={showErrorDialog}
              onClose={() => setShowErrorDialog(false)}
              type="error"
              message={errorMessage}
            />

            <ConfirmDeleteModal
              isOpen={showDeleteConfirm}
              onClose={() => {
                setShowDeleteConfirm(false);
                setDeleteTarget(null);
              }}
              onConfirm={executeDelete}
              title={
                deleteTarget?.type === "all"
                  ? "すべての履歴を削除"
                  : "履歴を削除"
              }
              message={
                deleteTarget?.type === "all"
                  ? "本当にすべての占い履歴を削除しますか？"
                  : "この占い履歴を削除しますか？"
              }
              isDeleting={isDeleting}
              deleteType={deleteTarget?.type}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
