/* Chashni Restaurant — forms.js : contact + reservation validation with success/error messages */
(function () {
  "use strict";

  function showAlert(form, type, msg) {
    var el = form.querySelector(".alert");
    if (!el) return;
    el.className = "alert show " + type;
    el.textContent = msg;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function setInvalid(input, bad) {
    var field = input.closest(".field");
    if (field) field.classList.toggle("invalid", bad);
    return !bad;
  }

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRe = /^09\d{9}$/;

  /* ---- Contact form ---- */
  var contact = document.getElementById("contactForm");
  if (contact) {
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = contact.querySelector("#cName");
      var email = contact.querySelector("#cEmail");
      var subject = contact.querySelector("#cSubject");
      var msg = contact.querySelector("#cMessage");

      var ok = true;
      ok = setInvalid(name, name.value.trim().length < 3) && ok;
      ok = setInvalid(email, !emailRe.test(email.value.trim())) && ok;
      ok = setInvalid(subject, subject.value.trim().length < 3) && ok;
      ok = setInvalid(msg, msg.value.trim().length < 10) && ok;

      if (!ok) {
        showAlert(contact, "error", "لطفاً خطاهای فرم را بررسی و اصلاح کنید.");
        return;
      }
      showAlert(contact, "success", "✓ پیام شما با موفقیت ارسال شد! کارشناسان ما حداکثر تا ۲۴ ساعت آینده پاسخ می‌دهند.");
      contact.reset();
    });

    contact.querySelectorAll("input, textarea").forEach(function (i) {
      i.addEventListener("input", function () {
        var f = i.closest(".field");
        if (f) f.classList.remove("invalid");
      });
    });
  }

  /* ---- Reservation form ---- */
  var reserve = document.getElementById("reserveForm");
  if (reserve) {
    // min date = today
    var dateInput = reserve.querySelector("#rDate");
    if (dateInput) {
      var t = new Date();
      var iso = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
      dateInput.min = iso;
    }

    reserve.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = reserve.querySelector("#rName");
      var phone = reserve.querySelector("#rPhone");
      var guests = reserve.querySelector("#rGuests");
      var date = reserve.querySelector("#rDate");
      var time = reserve.querySelector("#rTime");

      var ok = true;
      ok = setInvalid(name, name.value.trim().length < 3) && ok;
      ok = setInvalid(phone, !phoneRe.test(phone.value.trim().replace(/[\s-]/g, ""))) && ok;
      ok = setInvalid(guests, !(parseInt(guests.value, 10) >= 1 && parseInt(guests.value, 10) <= 20)) && ok;
      ok = setInvalid(date, !date.value) && ok;
      ok = setInvalid(time, !time.value) && ok;

      if (!ok) {
        showAlert(reserve, "error", "لطفاً اطلاعات رزرو را کامل و صحیح وارد کنید. شماره موبایل باید با ۰۹ شروع شود.");
        return;
      }

      var summary = reserve.querySelector("#reserveSummary");
      if (summary) {
        summary.innerHTML =
          "<div class='hours-box' style='margin:0 0 16px'>" +
          "میز شما برای <strong>" + guests.value.toLocaleString("fa-IR") + " نفر</strong> در تاریخ <strong>" + date.value +
          "</strong> ساعت <strong>" + time.value + "</strong> به نام <strong>" + name.value.trim() +
          "</strong> رزرو شد.</div>";
      }
      showAlert(reserve, "success", "✓ رزرو شما با موفقیت ثبت شد! پیامک تایید به شماره " + phone.value.trim() + " ارسال می‌شود.");
      reserve.reset();
    });

    reserve.querySelectorAll("input, select, textarea").forEach(function (i) {
      i.addEventListener("input", function () {
        var f = i.closest(".field");
        if (f) f.classList.remove("invalid");
      });
      i.addEventListener("change", function () {
        var f = i.closest(".field");
        if (f) f.classList.remove("invalid");
      });
    });
  }
})();
