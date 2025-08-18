import toast from "react-hot-toast";

export const validateAuth = ({ email, password, response, mode }) => {
  if (!email) {
    toast.error("Elektron pochta kiriting");
    document.getElementById("email")?.focus();
    return false;
  }

  if (!password) {
    toast.error("Parol kiriting");
    document.getElementById("password")?.focus();
    return false;
  }

  if (password.length < 6) {
    toast.error("Parol kamida 6 ta belgi bo‘lishi kerak");
    document.getElementById("password")?.focus();
    return false;
  }

  if (response?.error) {
    const msg = response.error.message?.toLowerCase();
    if (msg.includes("invalid login") || msg.includes("wrong password")) {
      toast.error("Email yoki parol noto‘g‘ri");
    } else if (response.error.status === 422 && mode === "register") {
      toast.error("Bu email allaqachon ro‘yxatdan o‘tgan");
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
  };

  for (const key in form) {
    if (!form[key]) {
      toast.error(`${labels[key]} kiriting`);
      document.getElementsByName(key)[0]?.focus();
      return false;
    }
  }

  if (form.price && (isNaN(+form.price) || +form.price <= 0)) {
    toast.error("Narx to‘g‘ri bo‘lishi kerak");
    document.getElementsByName("price")[0]?.focus();
    return false;
  }

  const phoneDigits = form.phone.replace(/\D/g, "");
  if (phoneDigits.length < 12) {
    toast.error("Telefon raqam to‘liq bo‘lishi kerak");
    document.getElementsByName("phone")[0]?.focus();
    return false;
  }

  return true;
};
