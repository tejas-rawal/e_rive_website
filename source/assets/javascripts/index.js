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

    var targetY = -135;

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
      const klass = 'closed';
      var icon = dropdown.querySelector('.fa');
      var answerClassList = dropdown.nextElementSibling.classList;
      var closedFlag = answerClassList.contains(klass);

      if(icon) removeEl(icon);

      if(closedFlag) {
        answerClassList.remove(klass);
      }
      else {
        answerClassList.add(klass);
      }

      switchArrow(dropdown, !closedFlag);
    });
  });
}

var switchArrow = (el, closed) => {
  var plus = '<i class="fa fa-plus"></i>'
  var minus = '<i class="fa fa-minus"></i>'

  if(closed) {
    appendBeforeEnd(el, plus);
  }
  else {
    appendBeforeEnd(el, minus);
  }
}

var appendBeforeEnd = (el, html) => {
  el.insertAdjacentHTML('beforeend', html);
}

var removeEl = el => {
  el.remove();
}

pageNav();
displayAnswer();
