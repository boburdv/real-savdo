import toast from "react-hot-toast";

export const validateAuth = ({ email, password, response, mode }) => {
  if (!email) {
    toast.error("Elektron pochtangizni kiriting");
    document.getElementById("email")?.focus();
    return false;
  }

  if (!password) {
    toast.error("Iltimos, parolingizni kiriting");
    document.getElementById("password")?.focus();
    return false;
  }

  if (password.length < 6) {
    toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
    document.getElementById("password")?.focus();
    return false;
  }

  if (response?.error) {
    const msg = response.error.message?.toLowerCase();
    if (msg.includes("invalid login") || msg.includes("wrong password")) {
      toast.error("Email yoki parol noto'g'ri kiritildi");
      document.getElementById("email")?.focus();
    } else if (response.error.status === 422 && mode === "register") {
      toast.error("Bu email allaqachon ro'yxatdan o'tgan");
      document.getElementById("email")?.focus();
    } else {
      toast.error(response.error.message || "Xatolik yuz berdi");
    }
    return false;
  }

  return true;
};

export const validateForm = (form) => {
  const labels = {
    title: "Sarlavha",
    description: "Tavsif",
    price: "Narx",
    category: "Kategoriya",
    phone: "Telefon raqam",
    telegram: "Telegram username",
  };

  for (const key in form) {
    if (!form[key]) {
      toast.error(`Iltimos, ${labels[key]}ni kiriting`);
      document.getElementById(key)?.focus();
      return false;
    }
  }

  if (form.price && (isNaN(+form.price) || +form.price <= 0)) {
    toast.error("Iltimos, narxni to'g'ri kiriting");
    document.getElementById("price")?.focus();
    return false;
  }

  const phoneDigits = form.phone.replace(/\D/g, "");
  if (phoneDigits.length < 12) {
    toast.error("Telefon raqam to'liq bo'lishi kerak!");
    document.getElementById("phone")?.focus();
    return false;
  }

  // form.telegram mavjudligini tekshirish
  if (!form.telegram || !/^@[a-zA-Z]+$/.test(form.telegram)) {
    toast.error("To'g'ri username kiritish muhim!");
    document.getElementById("telegram")?.focus();
    return false;
  }

  return true;
};
