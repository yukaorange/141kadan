$(function () {
  //===========================
  //aos
  //===========================
  AOS.init({
    delay: 100,
  });
   //===========================
  // スクロールでサブヘッダー表示
  //===========================
  $(window).scroll(function () {
    let height = 150;
    let scroll = $(this).scrollTop();
    if (scroll >= height) {
      $(".sh").addClass("_active");
      $(".sh").removeClass("_inactive");
    } else {
      $(".sh").removeClass("_active");
      $(".sh").addClass("_inactive");
    };
  }
  );
  //===========================
  //トグルボタン/スマホメニュー
  //===========================
  $(".header-toggle,.sh-toggle,.mobile-toggle").click(function () {
    toggleBtn();
    slideOpen();
  });
  $(".mobile-toggle").click(function () {
    toggleBtn();
    slideClose();
  });
  $(".mobile-bg").click(function () {
    toggleBtn();
    slideClose();
  });

  function toggleBtn() {
    $(".toggle-btn").toggleClass("_active");
  }

  function slideOpen(){
    $(".mobile-bg").fadeIn();
    $(".mobile-links").fadeIn();
  }

  function slideClose(){
    $(".mobile-bg").fadeOut();
    $(".mobile-links").fadeOut();
  }
  
  
  // //===========================
  // //モーダル表示・非表示
  // //===========================
  $("._reserve").click(function () {
    ModalOpen();
    return false;
  });
  $(".modal-bg").click(function(){
    ModalClose();
  });
  $(".modal-close").click(function(){
    ModalClose();
  });

  function ModalOpen(){
    $(".modal-bg").fadeIn();
    $(".modal-container").fadeIn();
    $("body").addClass("no-scroll");
  }

  function ModalClose(){
    $(".modal-bg").fadeOut();
    $(".modal-container").fadeOut();
    $("body").removeClass("no-scroll");
  }


  //===========================
  //フォーム バリデーション
  //===========================
  const submit = $('.form-submit')
  $('#form input,#form textarea').change(function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form input[type="checkbox"]').prop('checked') === true
    ) {
      submit.prop('disabled', false);
      submit.removeClass("_disabled")
    } else {
      submit.prop('disabled', true);
      submit.addClass("_disabled")
    }
  });
  //===========================
  //フォーム送信後
  //===========================
  $('#form').submit(function (event) {
    let formData = $('#form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdcjB0dM0azTJw7OvQjlIggXRUyCJlHBThMlROYHAjcYPtoYg/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".form-end").slideDown("slow");
          $(".form-submit").fadeOut("fast");
        },
        200: function () {
          $(".form-false").slideDown();
        }
      }
    });
    event.preventDefault();
  });





});




