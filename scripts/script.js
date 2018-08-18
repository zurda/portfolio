// Photo by Amy Hirschi on Unsplash


(function(window, undefined) // Code in a function to create an isolate scope
{
    'use strict';
    var height_fixed_header = 0, // For layout with header with position:fixed. Write here the height of your header for your anchor don't be hiden behind
        speed = 500,
        moving_frequency = 15, // Affects performance ! High number makes scroll more smooth
        links = document.getElementsByTagName('a'),
        href;
    
    for(var i = 0; i < links.length; i++)
    {
        href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
        if(href !== null && href.length > 1 && href.indexOf('#') != -1) // href.substr(0, 1) == '#'
        {
            links[i].onclick = function()
            {
                var element,
                    href = this.attributes.href.nodeValue.toString(),
                    url = href.substr(0, href.indexOf('#')),
                    id = href.substr(href.indexOf('#') + 1);
                if (element = document.getElementById(id))
                {

                    var hop_count = (speed - (speed % moving_frequency)) / moving_frequency, // Always make an integer
                        getScrollTopDocumentAtBegin = getScrollTopDocument(),
                        gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
                    
                    if (window.history && typeof window.history.pushState == 'function')
                        window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser

                    for (var i = 1; i <= hop_count; i++)
                    {
                        (function()
                        {
                            var hop_top_position = gap * i;
                            setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency * i);
                        })();
                    }

                    return false;
                }
            };
        }
    }
    
    var getScrollTopElement =  function(e)
    {
        var top = height_fixed_header * -1;

        while (e.offsetParent != undefined && e.offsetParent != null)
        {
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return top;
    };
    
    var getScrollTopDocument = function()
    {
        return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
    };
})(window);


// cut the mustard
if ('querySelector' in document && 
    'addEventListener' in window) {

    var toggleButtons = document.querySelectorAll('.toggle-content');
    var fullTextWrappers = document.querySelectorAll('.fulltext');
    var fullText;
    var toggleButtonText;
    

    [].forEach.call(fullTextWrappers, function(fullTextWrapper) {
        // hide all full text on load
        fullTextWrapper.setAttribute('hidden', true);
    });

    [].forEach.call(toggleButtons, function(toggleButton) {
        // show toggle more buttons
        toggleButton.removeAttribute('hidden');

        // add listener for each button
        toggleButton.addEventListener('click', function () {

            fullTextWrapper = this.parentElement.querySelector('.fulltext');
            toggleButtonText = this.querySelector('.text');

            // change attributes and text if full text is shown/hidden
            if (!fullTextWrapper.hasAttribute('hidden')) {
                toggleButtonText.innerText = 'Show More';
                fullTextWrapper.setAttribute('hidden', true);
                toggleButton.setAttribute('aria-expanded', false);
            } else {
                toggleButtonText.innerText = 'Show Less';
                fullTextWrapper.removeAttribute('hidden');
                toggleButton.setAttribute('aria-expanded', true);
            }
        });
    });
}