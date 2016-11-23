require('/Users/tejasrawal/Work/e_rive_site/source/stylesheets/site.scss');

var pageNav = () => {
  var sectionLinks = document.getElementsByClassName('section-link');

  Array.from(sectionLinks, sectionLink => {
    sectionLink.addEventListener('click', () => {
      console.log(this);
      var section = document.querySelector(sectionLink.attributes.href.nodeValue);
      if(section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

var displayAnswer = () => {
  var questions = document.querySelectorAll('.collapsible');

  Array.from(questions, dropdown => {
    dropdown.addEventListener('click', () => {
      var answerClass = dropdown.nextElementSibling.className;

      if(answerClass === 'answer-show') {
        dropdown.nextElementSibling.className = 'answer-hidden';

      } else {
        dropdown.nextElementSibling.className = 'answer-show';
      }
    });
  });
}

pageNav();
displayAnswer();
