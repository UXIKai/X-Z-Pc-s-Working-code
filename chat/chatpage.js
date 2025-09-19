import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../chatpage.css";

// utils
const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const genId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const STORAGE_KEY = "xz-chat-conversations:v2";
const STORAGE_SELECTED = "xz-chat-selectedId:v2";

function ChatPage() {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: genId(),
        name: "Welcome",
        group: false,
        messages: [
          { sender: "received", text: "Create a chat from the sidebar ➕", time: nowTime() },
        ],
      },
    ];
  });

  const [selectedChatId, setSelectedChatId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_SELECTED) || null;
    } catch {
      return null;
    }
  });

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // bottom search & attach menu
  const [query, setQuery] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const selectedConversation =
    conversations.find((c) => c.id === selectedChatId) ?? null;

  // select first chat by default
  useEffect(() => {
    if (!selectedChatId && conversations.length) {
      setSelectedChatId(conversations[0].id);
    }
  }, [selectedChatId, conversations]);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    try {
      if (selectedChatId) localStorage.setItem(STORAGE_SELECTED, selectedChatId);
      else localStorage.removeItem(STORAGE_SELECTED);
    } catch {}
  }, [selectedChatId]);

  // autoscroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages?.length, isTyping]);

  // canned reply
  const generateReply = useCallback((msg) => {
    const m = msg.toLowerCase();
    if (m.includes("gpu")) return "🖥️ A GPU accelerates graphics & parallel compute.";
    if (m.includes("ram")) return "💾 RAM helps with multitasking and speed.";
    if (m.includes("ssd")) return "⚡ SSDs are faster and quieter than HDDs.";
    return "🤖 Ask me anything! I’m here.";
  }, []);

  const appendMessage = useCallback((chatId, message) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, message] } : c))
    );
  }, []);

  const handleSend = useCallback(() => {
    if (!newMessage.trim() || !selectedConversation) return;
    const msg = { sender: "sent", text: newMessage.trim(), time: nowTime() };
    appendMessage(selectedConversation.id, msg);
    setNewMessage("");
    setIsTyping(true);
    const copy = msg.text;
    setTimeout(() => {
      appendMessage(selectedConversation.id, {
        sender: "received",
        text: generateReply(copy),
        time: nowTime(),
      });
      setIsTyping(false);
    }, 900);
  }, [newMessage, selectedConversation, appendMessage, generateReply]);

  const handleDeleteMessage = useCallback(
    (idx) => {
      if (!selectedConversation) return;
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversation.id
            ? { ...c, messages: c.messages.filter((_, i) => i !== idx) }
            : c
        )
      );
    },
    [selectedConversation]
  );

  const handleCreateChat = useCallback((name = "New Chat") => {
    const newChat = { id: genId(), name, group: false, messages: [] };
    setConversations((prev) => [...prev, newChat]);
    setSelectedChatId(newChat.id);
  }, []);

  const handleRename = useCallback((id) => {
    const name = window.prompt("Enter new name");
    if (!name?.trim()) return;
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, name: name.trim() } : c)));
  }, []);

  const handleDeleteChat = useCallback(
    (id) => {
      const updated = conversations.filter((c) => c.id !== id);
      setConversations(updated);
      if (selectedChatId === id) setSelectedChatId(updated[0]?.id ?? null);
    },
    [conversations, selectedChatId]
  );

  // bottom search bar actions
  const handlePlus = () => setAttachOpen((v) => !v);
  const handleAttachUrl = () => {
    const url = window.prompt("Enter a URL");
    if (!url || !selectedConversation) return;
    appendMessage(selectedConversation.id, {
      sender: "sent",
      text: `URL: ${url}`,
      time: nowTime(),
    });
    setAttachOpen(false);
  };
  const handleAttachPicture = () => {
    fileInputRef.current?.click();
  };
  const handleFilePicked = (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedConversation) return;
    appendMessage(selectedConversation.id, {
      sender: "sent",
      text: `Picture: ${file.name}`,
      time: nowTime(),
    });
    e.target.value = "";
    setAttachOpen(false);
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          ← Back
        </button>

        <div className="page-title">Direct Messages</div>

        <div className="header-right">
          <img
            className="profile-pic"
            src="https://api.dicebear.com/7.x/identicon/svg?seed=you"
            alt="Profile"
          />
        </div>
      </div>

      {/* CHAT GRID */}
      <div className="chat-page">
        {/* SIDEBAR */}
        <aside className="chat-sidebar" aria-label="Chat list">
          <div className="chat-sidebar-header">
            <h2>Chats</h2>
            <div className="sidebar-actions">
              <button className="sidebar-add" onClick={() => handleCreateChat()}>
                Add
              </button>
            </div>
          </div>

          <div className="chat-list">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${chat.id === selectedChatId ? "active" : ""}`}
                onClick={() => setSelectedChatId(chat.id)}
              >
                <span>👤 {chat.name}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(chat.id);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="icon-btn alt"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="chat-main">
          {selectedConversation ? (
            <>
              <div className="group-header">
                <div className="group-title" title={selectedConversation.name}>
                  {selectedConversation.name}
                </div>
                <button className="icon-btn" onClick={() => handleCreateChat("New Chat")}>
                  Add
                </button>
                <button
                  className="icon-btn alt"
                  onClick={() => handleDeleteChat(selectedConversation.id)}
                >
                  Delete
                </button>
              </div>

              <div className="chat-messages" aria-live="polite" aria-relevant="additions">
                {selectedConversation.messages.map((m, i) => (
                  <div key={i} className={`message ${m.sender}`}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <span>{m.text}</span>
                      <button
                        className="icon-btn alt"
                        onClick={() => handleDeleteMessage(i)}
                        title="Delete message"
                      >
                        ✖️
                      </button>
                    </div>
                    {/* FIXED: React style object, not string */}
                    <div style={{ marginTop: 6, fontSize: 12, color: "#555" }}>{m.time}</div>
                  </div>
                ))}
                {isTyping && <div className="message received">Typing…</div>}
                <div ref={chatEndRef} />
              </div>
            </>
          ) : (
            <div
              className="chat-messages"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div className="message received">Select or create a chat to start.</div>
            </div>
          )}
        </main>
      </div>

      {/* BOTTOM SEARCH BAR */}
      <div className="global-search" role="search">
        <input
          type="search"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
           <button className="send-btn" onClick={handleSend} aria-label="Send message">
          ➤
        </button>
        <button
          className="plus-btn"
          aria-haspopup="menu"
          aria-expanded={attachOpen}
          onClick={handlePlus}
        >
          ＋
        </button>
     
      </div>

      {/* Attach menu */}
      {attachOpen && (
        <div className="attach-menu" role="menu">
          <button role="menuitem" onClick={handleAttachUrl}>
            Add URL
          </button>
          <button role="menuitem" onClick={handleAttachPicture}>
            Add Picture
          </button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFilePicked}
      />
    </>
  );
}

export default ChatPage;
