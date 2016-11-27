var pageNav = () => {
  var sectionLinks = document.getElementsByClassName('section-link');

  Array.from(sectionLinks, sectionLink => {
    sectionLink.addEventListener('click', () => {
      smoothScroll(sectionLink.dataset.target);
    });
  });
}

var smoothScroll = elementId => {
    const min_pixels_per_step = 16;
    const max_scroll_steps = 15;
    var target = document.getElementById(elementId);
    var scrollContainer = target;

    do {
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;

    do {
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    var pixelsPerStep = Math.max(min_pixels_per_step, (targetY - scrollContainer.scrollTop) / max_scroll_steps);
    var stepFunc = () => {
        scrollContainer.scrollTop = Math.min(targetY, pixelsPerStep + scrollContainer.scrollTop);
        if (scrollContainer.scrollTop >= targetY) return;
        requestAnimation(stepFunc);
    };

    requestAnimation(stepFunc);
}

var requestAnimation = fn => {
  window.requestAnimationFrame(fn);
}

var displayAnswer = () => {
  var questions = document.querySelectorAll('.collapsible');

  Array.from(questions, dropdown => {
    dropdown.addEventListener('click', () => {
      removeEl(dropdown.children[dropdown.children.length - 1]);

      var answerClassList = dropdown.nextElementSibling.classList;
      var closedFlag = answerClassList.contains('closed');

      if(answerClassList.contains('closed')) {
        answerClassList.remove('closed');
      }
      else {
        answerClassList.add('closed');
      }

      switchArrow(dropdown, !closedFlag);
    });
  });
}

var switchArrow = (el, closed) => {
  var plus = '<i class="fa fa-plus"></i>'
  var minus = '<i class="fa fa-minus"></i>'

  if(closed) {
    el.insertAdjacentHTML('beforeend', plus);
  }
  else {
    el.insertAdjacentHTML('beforeend', minus);
  }
}

var removeEl = el => {
  el.remove();
}

pageNav();
displayAnswer();
