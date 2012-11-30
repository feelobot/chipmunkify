function showMyVideos(data)
        {
            var feed = data.feed;
            var entries = feed.entry || [];
            var html = ['<ul>'];
            for (var i = 0; i < entries.length; i++)
            {
                var entry = entries[i];
                //var playCount = entry.yt$statistics.viewCount.valueOf() + ' views';
                var title = entry.title.$t;
                var lnk = entry.link[0].href;
                html.push('<li class=\"yt-link\"><a href=\"'+lnk+'\">', title, '</a></li>');
            }
            html.push('</ul>');
            document.getElementById('results').innerHTML = html.join('');
        }
