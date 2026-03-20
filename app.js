const { useEffect, useMemo, useState } = React;

const DEFAULT_POSTS = [
  {
    id: crypto.randomUUID(),
    handle: 'CodeNeko',
    title: 'Reactの勉強方法を共有しよう',
    comment: '公式ドキュメント + 小さいアプリを作るのが一番でした。みなさんはどうですか？',
    tags: ['React', '学習'],
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    handle: 'YamadaDev',
    title: 'VS Code拡張のおすすめ',
    comment: 'ESLint, Prettier, Error Lensの3つが特に便利でした。',
    tags: ['ツール', 'VS Code'],
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
];

const STORAGE_KEY = 'modern-board-posts';

const formatDate = (iso) =>
  new Date(iso).toLocaleString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_POSTS;

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  });
  const [form, setForm] = useState({ handle: '', title: '', comment: '', tags: '' });
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;

    return posts.filter((post) => {
      const merged = `${post.handle} ${post.title} ${post.comment} ${post.tags.join(' ')}`.toLowerCase();
      return merged.includes(q);
    });
  }, [posts, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.handle.trim() || !form.title.trim() || !form.comment.trim()) return;

    const newPost = {
      id: crypto.randomUUID(),
      handle: form.handle.trim(),
      title: form.title.trim(),
      comment: form.comment.trim(),
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setForm({ handle: '', title: '', comment: '', tags: '' });
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="badge">Modern Keijiban</p>
        <h1>プログラミング掲示板</h1>
        <p className="hero-sub">質問・知見・おすすめを気軽にシェアできる、シンプルで見やすい掲示板です。</p>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <h2>新規投稿</h2>
          <form onSubmit={handleSubmit} className="post-form">
            <label>
              ハンドルネーム
              <input
                value={form.handle}
                onChange={(e) => setForm((prev) => ({ ...prev, handle: e.target.value }))}
                placeholder="例: TanakaDev"
                maxLength={24}
              />
            </label>
            <label>
              タイトル
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="相談したいこと・共有したいこと"
                maxLength={60}
              />
            </label>
            <label>
              コメント
              <textarea
                value={form.comment}
                onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                rows={5}
                placeholder="本文を入力..."
                maxLength={400}
              />
            </label>
            <label>
              タグ（カンマ区切り）
              <input
                value={form.tags}
                onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                placeholder="React, TypeScript, 初心者"
              />
            </label>
            <button type="submit">投稿する</button>
          </form>
        </section>

        <section className="panel timeline-panel">
          <div className="timeline-header">
            <h2>投稿一覧</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="キーワードで検索"
              aria-label="キーワード検索"
            />
          </div>

          <div className="post-list">
            {filteredPosts.length === 0 ? (
              <p className="empty">一致する投稿がありません。</p>
            ) : (
              filteredPosts.map((post) => (
                <article className="post" key={post.id}>
                  <div className="post-top">
                    <h3>{post.title}</h3>
                    <time>{formatDate(post.createdAt)}</time>
                  </div>
                  <p className="comment">{post.comment}</p>
                  <div className="post-bottom">
                    <span>by {post.handle}</span>
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <span key={`${post.id}-${tag}`} className="tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
