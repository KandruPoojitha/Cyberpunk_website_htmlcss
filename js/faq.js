document.addEventListener("DOMContentLoaded", function () {
    var faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            toggleAnswerVisibility(question);
        });
    });

    function toggleAnswerVisibility(question) {
        var answer = question.nextElementSibling; 

        if (answer.style.display === "block" || answer.style.display === "") {
            answer.style.display = "none";
            question.classList.remove("active");
        } else {
            answer.style.display = "block";
            question.classList.add("active");
        }
    }
    document.getElementById("expand-all").addEventListener("click", function () {
        expandCollapseAll(true);
    });

    document.getElementById("collapse-all").addEventListener("click", function () {
        expandCollapseAll(false);
    });

    function expandCollapseAll(expand) {
        var faqAnswers = document.querySelectorAll(".faq-answer");
        
        for (var i = 0; i < faqAnswers.length; i++) {
            if (expand) {
                faqAnswers[i].style.display = "block";
            } else {
                faqAnswers[i].style.display = "none";
            }
        }

        var faqQuestions = document.querySelectorAll(".faq-question");
        for (var j = 0; j < faqQuestions.length; j++) {
            if (expand) {
                faqQuestions[j].classList.add("active");
            } else {
                faqQuestions[j].classList.remove("active");
            }
        }
    }
});
