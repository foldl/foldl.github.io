---
layout: post
title:  "Show Charts in common_test Report"
date:   2015-06-24 08:20:22
tags: erlang common_test en
---

`common_test` is a wonderful framework for tests, and if we can make some charts in its report,
things would be even greater.

Here is my solution, using [Flot][flot].

#### Manipulate HTML Report with Hooks

1. When a suite is started, copy `jquery.flot.min.js` and `jquery.flot.axislabels.js` to logdir.

1. When a case is started, inject some JavaScript into the HTML log file.

{% highlight erlang %}
{% raw %}
inject_html(Html) ->
    Msg = {log, sync, self(), group_leader(), default, ?STD_IMPORTANCE,
	  [{Html,[]}]},
    case whereis(ct_logs) of
	undefined ->
	    {error,does_not_exist};
	_Pid ->
	    ct_logs ! Msg
    end.

%% @doc Called before init_per_testcase
pre_init_per_testcase(TestcaseName, InitData, #state{graph_code = Code} = State) ->
    inject_html(binary_to_list(Code)),
    {InitData, State}.
{% endraw %}
{% endhighlight %}

Here, `graph_code` is a master-piece of JS:

{% highlight html %}
{% raw %}
<script type="text/javascript" src="../../../jquery.flot.min.js"></script>
<script type="text/javascript" src="../../../jquery.flot.axislabels.js"></script>
<script type="text/javascript">
var gid = 100;
function ShowGraph(obj)
{
    var c = obj.textContent;
    var i = c.indexOf('{');
    if (i < 0) return;
    var x = $.parseJSON(c.substr(i, c.length - i - 1));
    var id = "gxxxx" + gid;
    gid++;
    var node= document.createElement("DIV");
    node.id = id;
    obj.parentNode.insertBefore(node, obj);
    obj.parentNode.removeChild(obj);
    var container = $('#' + id);
    container.width("60%");
    container.height(320);
    
    container.append('<div style="text-align:center"><b>' + x.title + "</b></div>"); 
    container.append('<div id="' + id + id + '"></div>');
    var g = $('#' + id + id);
    g.height(300);
    $.plot(g, x.series, 
       {
            xaxis: { axisLabel: x.xaxis}, 
            yaxis: { axisLabel: x.yaxis},
            series: {
                lines: { show: true },
                points: { show: true }
            },
            grid: { hoverable: true, clickable: true }
       }
    );
    // ct's CSS is urgly for legend
    $('.legend table').css('border','none');
    $('.legend td').css('border','none');
    $('.legend th').css('border','none');

    g.bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                $("#tooltip").html("(" + x + ", " + y + ")")
                    .css({top: item.pageY+5, left: item.pageX+5})
                    .fadeIn(200);
            } else {
                $("#tooltip").hide();
            }
        });
}
$(function() {
       $("<div id='tooltip'></div>").css({
                position: "absolute",
                display: "none",
                border: "1px solid #fdd",
                padding: "2px",
                "background-color": "#fee",
                opacity: 0.80
            }).appendTo("body");
        var objs = $('div.chart');
        for (var i = 0; i < objs.length; i ++) ShowGraph(objs[i]);
    });
     
</script>

{% endraw %}
{% endhighlight %}


#### Emit Charts in Test Cases

`ct:log(chart, ?STD_IMPORTANCE, "~s", [Json])` will do the job, in which Json is a JSON 
representation of the chart (`x` in function ShowGraph).

[flot]: http://flotcharts.org/

