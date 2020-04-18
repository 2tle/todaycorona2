function getCovData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://todaycorona.site/request/covdata');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send();
    xhr.addEventListener('load',function() {
        
        var aaaaa = JSON.parse(xhr.responseText);
	var result = JSON.parse(aaaaa);
	console.log(result);
	console.log(typeof(result));
        document.getElementById('int_g').innerHTML = result[0].internal_gam;
        document.getElementById('int_die').innerHTML = result[0].internal_die;
        document.getElementById('int_c').innerHTML = result[0].internal_clear;
        document.getElementById('int_d').innerHTML = result[0].internal_doing;
        document.getElementById('ext_gam').innerHTML = result[0].external_gam;
        document.getElementById('ext_die').innerHTML = result[0].external_die;
        document.getElementById('chi_gam').innerHTML = result[0].china_gam;
        document.getElementById('chi_die').innerHTML = result[0].china_die;
	document.getElementById('lod').style.display = "none";
    });
}

function saibiSearch() {
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://todaycorona.site/request/saibiL/'+document.getElementById('address').value);
    xhr1.setRequestHeader('Content-Type','application/json');
    xhr1.send();
    xhr1.addEventListener('load', function() {
        var sdata = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">타입</th><th scope="col">주소</th><th scope="col">방역여부</th></tr></thead><tbody>';
        var result1 = JSON.parse(xhr1.responseText);
	    var tq = JSON.parse(result1);
        for(var i =0;i<tq.length;i++){
            sdata = sdata + '<tr><th scope="row">'+i+'</th><td>'+tq[i].type+'</td><td>'+tq[i].address+'</td><td>'+tq[i].isClear+'</td><tr>';
        }
        sdata = sdata + '</tbody></table>';
        document.getElementById('scj').innerHTML = sdata;
    });
}

function WorldSearch() {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://todaycorona.site/worldViewGETGET');
    //xhr2.setRequestHeader('Content-Type','application/json');
    xhr2.send();
    xhr2.addEventListener('load', function() {
        console.log(xhr2.responseText);
        document.getElementById('vh').innerHTML = xhr2.responseText;
    });
}
