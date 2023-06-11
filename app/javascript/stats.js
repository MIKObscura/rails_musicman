function clearCharts(){
    let charts = document.getElementsByTagName("canvas")
    for(let i = 0; i < charts.length; i++){
        let chartStatus = Chart.getChart(charts[i].id)
        if(chartStatus !== undefined){
            chartStatus.destroy()
        }
    }
}

function sortRaw(obj){
    let keys = Object.keys(obj)
    let sortedKeys = keys.slice().sort((x, y) => {
        if(obj[x] < obj[y]) return 1
        if(obj[x] > obj[y]) return -1
        return 0
    })
    let new_obj = {}
    let max = sortedKeys.length >= 10 ? 10 : sortedKeys.length
    for(let i = 0; i < max; i++){
        new_obj[sortedKeys[i]] = obj[sortedKeys[i]]
    }
    return new_obj
}

function init_overall(){
    clearCharts()
    hoursChart(null)
    artistsChart(null)
    albumsChart(null)
    artistsTimeChart(null)
    albumsTimeChart(null)
    tracksChart()
    miscStats(null)
    weekdaysChart(null)
}

function init_week(){
    clearCharts()
    hoursChart("week")
    artistsChart("week")
    albumsChart("week")
    miscStats("week")
    weekdaysChart("week")
    artistsTimeChart("week")
    albumsTimeChart("week")
}

function init_month(){
    clearCharts()
    hoursChart("month")
    artistsChart("month")
    albumsChart("month")
    miscStats("month")
    weekdaysChart("month")
    artistsTimeChart("month")
    albumsTimeChart("month")
}

function init_year(){
    clearCharts()
    hoursChart("year")
    artistsChart("year")
    albumsChart("year")
    miscStats("year")
    weekdaysChart("year")
    artistsTimeChart("year")
    albumsTimeChart("year")
}

function hoursChart(time){
    let hours
    switch (time){
        case "week":
            hours = data.last_week.hours
            break
        case "month":
            hours = data.this_month.hours
            break
        case "year":
            hours = data.this_year.hours
            break
        default:
            hours = data.listening_hours
    }
    const charts_data = {
        labels: Object.keys(hours),
        datasets: [{
            label: "Listening hours",
            data: Object.values(hours),
            backgroundColor: random_colors(24, 220)
        }]
    }
    const config = {
        type: "polarArea",
        data: charts_data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Tracks played for each hour",
                    position: "top"
                }
            }
        }
    }
    const chartId = document.getElementById("hours_graph")
    const chart = new Chart(chartId, config)
}

function weekdaysChart(time){
    let weekdays
    switch(time){
        case "week":
            weekdays = data.last_week.days
            break
        case "month":
            weekdays = data.this_month.days
            break
        case "year":
            weekdays = data.this_year.days
            break
        default:
            weekdays = data.listening_days
    }
    const charts_data = {
        labels: Object.keys(weekdays),
        datasets: [{
            label: "Listening days",
            data: Object.values(weekdays),
            backgroundColor: random_colors(7, 160)
        }]
    }
    const config = {
        type: "bar",
        data: charts_data,
        options: {
            responsive: true
        }
    }
    const chartId = document.getElementById("days_graph")
    const chart = new Chart(chartId, config)
}

function artistsChart(time){
    let artists
    switch(time){
        case "week":
            artists = sortRaw(data.last_week.artists)
            break
        case "month":
            artists = sortRaw(data.this_month.artists)
            break
        case "year":
            artists = sortRaw(data.this_year.artists)
            break
        default:
            artists = data.artists_listens
    }
    const charts_data = {
        labels: Object.keys(artists),
        datasets: [{
            label: "10 most played artists (by number of tracks played)",
             data: Object.values(artists),
            backgroundColor: random_colors(10, 10)
        }]
    }
    const config = {
        type: "bar",
        data: charts_data,
        options: {
            responsive: true,
            indexAxis: "y"
        }
    }
    const chartId = document.getElementById("artists_graph")
    const chart = new Chart(chartId, config)
}

function albumsChart(time){
    let albums
    switch(time){
        case "week":
            albums = sortRaw(data.last_week.albums)
            break
        case "month":
            albums = sortRaw(data.this_month.albums)
            break
        case "year":
            albums = sortRaw(data.this_year.albums)
            break
        default:
            albums = data.albums_listens
    }
    const charts_data = {
        labels: Object.keys(albums),
        datasets: [{
            label: "10 most played albums (by number of tracks played)",
            data: Object.values(albums),
            backgroundColor: random_colors(10, 250)
        }]
    }
    const config = {
        type: "bar",
        data: charts_data,
        options: {
            responsive: true,
            indexAxis: "y"
        }
    }
    const chartId = document.getElementById("albums_graph")
    const chart = new Chart(chartId, config)
}

function artistsTimeChart(time){
    let artists
    switch(time){
        case "week":
            artists = sortRaw(data.last_week.artists_time)
            break
        case "month":
            artists = sortRaw(data.this_month.artists_time)
            break
        case "year":
            artists = sortRaw(data.this_year.artists_time)
            break
        default:
            artists = data.artists_time
    }
    const charts_data = {
        labels: Object.keys(artists),
        datasets: [{
            label: "10 most played artists (by time played in seconds)",
            data: Object.values(artists),
            backgroundColor: random_colors(10, 120)
        }]
    }
    const config = {
        type: "bar",
        data: charts_data,
        options: {
            responsive: true,
            indexAxis: "y"
        }
    }
    const chartId = document.getElementById("artists_time_graph")
    const chart = new Chart(chartId, config)
}

function albumsTimeChart(time){
    let albums
    switch(time){
        case "week":
            albums = sortRaw(data.last_week.albums_time)
            break
        case "month":
            albums = sortRaw(data.this_month.albums_time)
            break
        case "year":
            albums = sortRaw(data.this_year.albums_time)
            break
        default:
            albums = data.albums_time
    }
    const charts_data = {
        labels: Object.keys(albums),
        datasets: [{
            label: "10 most played albums (by time played in seconds)",
            data: Object.values(albums),
            backgroundColor: random_colors(10, 340)
        }]
    }
    const config = {
        type: "bar",
        data: charts_data,
        options: {
            responsive: true,
            indexAxis: "y"
        }
    }
    const chartId = document.getElementById("albums_time_graph")
    const chart = new Chart(chartId, config)
}

function tracksChart(){
    let tracks = data.tracks_listens
    const charts_data = {
        labels: Object.keys(tracks),
        datasets: [{
            label: "10 most played tracks",
            data: Object.values(tracks),
            backgroundColor: random_colors(10, 280)
        }]
    }
    const config = {
        type: "bar",
        data: charts_data,
        options: {
            responsive: true,
            indexAxis: "y"
        }
    }
    const chartId = document.getElementById("tracks_graph")
    const chart = new Chart(chartId, config)
}

function totalPlaytime(time){
    let seconds
    switch(time){
        case "week":
            seconds = data.last_week.total_time
            break
        case "month":
            seconds = data.this_month.total_time
            break
        case "year":
            seconds = data.this_year.total_time
            break
        default:
            seconds = data.listening_time
    }
    let hms = {
        hours: 0,
        minutes: 0,
        seconds: 0
    }
    let hour = Math.floor(seconds / 3600)
    if(hour > 1){
        hms.hours = hour
        seconds -= hour * 3600
    }
    let min = Math.floor(seconds / 60)
    if(min > 1){
        hms.minutes = min
        seconds -= min * 60
    }
    hms.seconds = seconds
    return hms
}

function miscStats(timestamp){
    let time = totalPlaytime(timestamp)
    switch(timestamp){
        case "week":
            document.getElementById("diff_t").innerText = data.last_week.total_tracks
            document.getElementById("diff_al").innerText = data.last_week.total_albums
            document.getElementById("diff_ar").innerText = data.last_week.total_artists
            document.getElementById("total").innerText = `${time.hours}h${time.minutes}m${time.seconds}s`
            break
        case "month":
            document.getElementById("diff_t").innerText = data.this_month.total_tracks
            document.getElementById("diff_al").innerText = data.this_month.total_albums
            document.getElementById("diff_ar").innerText = data.this_month.total_artists
            document.getElementById("total").innerText = `${time.hours}h${time.minutes}m${time.seconds}s`
            break
        case "year":
            document.getElementById("diff_t").innerText = data.this_year.total_tracks
            document.getElementById("diff_al").innerText = data.this_year.total_albums
            document.getElementById("diff_ar").innerText = data.this_year.total_artists
            document.getElementById("total").innerText = `${time.hours}h${time.minutes}m${time.seconds}s`
            break
        default:
            document.getElementById("diff_t").innerText = data.different_tracks
            document.getElementById("diff_al").innerText = data.different_albums
            document.getElementById("diff_ar").innerText = data.different_artists
            document.getElementById("total").innerText = `${time.hours}h${time.minutes}m${time.seconds}s`
    }
}

function random_colors(numbers, base){
    let step = 60 / numbers
    let colors = []
    for(let i = 0; i < numbers; i++){
        colors.push(`hsl(${base}, 90%, ${20+i*step}%`)
    }
    return colors
}