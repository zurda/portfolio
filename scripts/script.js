// Photo by Amy Hirschi on Unsplash


var height_fixed_header = 50, // For layout with header with position:fixed. Write here the height of your header for your anchor don't be hiden behind
    speed = 500,
    moving_frequency = 15, // Affects performance ! High number makes scroll more smooth
    links = document.getElementsByTagName('a'),
    href;

for (var i = 0; i < links.length; i++) {
    href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
    if (href !== null && href.length > 1 && href.indexOf('#') != -1) // href.substr(0, 1) == '#'
    {
        links[i].onclick = function () {
            var element,
                href = this.attributes.href.nodeValue.toString(),
                url = href.substr(0, href.indexOf('#')),
                id = href.substr(href.indexOf('#') + 1);
            if (element = document.getElementById(id)) {
                const current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                document.getElementById("nav-" + id).className += " active";

                var hop_count = (speed - (speed % moving_frequency)) / moving_frequency, // Always make an integer
                    getScrollTopDocumentAtBegin = getScrollTopDocument(),
                    gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                if (window.history && typeof window.history.pushState == 'function')
                    window.history.pushState({}, undefined, url + '#' + id); // Change URL for modern browser

                for (var i = 1; i <= hop_count; i++) {
                    (function () {
                        var hop_top_position = gap * i;
                        setTimeout(function () { window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency * i);
                    })();
                }

                return false;
            }
        };
    }
}

var getScrollTopElement = function (e) {
    var top = height_fixed_header * -1;

    while (e.offsetParent != undefined && e.offsetParent != null) {
        top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
        e = e.offsetParent;
    }

    return top;
};

var getScrollTopDocument = function () {
    return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
};

function readMore() {
    var dots = document.getElementById("line-breaks");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("read-more-btn");
    var avatar = document.getElementById('avatar');

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
        avatar.style.display = 'inline';
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
        avatar.style.display = 'none';
    }
}

const listRepos = async username => {
    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?type=owner&sort=updated`
    ).then(res => res.json());

    const content = document.getElementById('repos');
    const markup = repos.slice(0, 8).map(
        repo => `
    <li>
      <a href="${repo.html_url}">${repo.name}</a> 
      (⭐️ ${repo.stargazers_count})
    </li>
  `
    );

    content.innerHTML = `<ul>${markup.join('')}</ul>`;
};

listRepos('zurda');