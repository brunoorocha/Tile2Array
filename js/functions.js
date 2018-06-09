var gridArray = []
var colorsArray = [
    "#3B0E0E",
    "#621617",
    "#891F20", 
    "#B02829",
    "#D63031",
    "#DD5556",
    "#E47B7B",
    "#ECA0A1",
    "#F3C6C6"
]

$(document).ready(function() {

    $('#choosed-image').on('change', function(event) {
        setImagePreview(event)            
    })

    $('#image-preview').on('load', function() {
        $('#tile-width').removeAttr('disabled')
        prepareAndSetGrid()        
    })
       
    $('#tile-width').on('blur', function() {
        prepareAndSetGrid()        
    })

    $('#tile-width').on('keyup', function(event) {
        if(event.keyCode == 13) {
            prepareAndSetGrid()        
            $(this).blur()
        }        
    })

    $('.hierarchy-btn').on('click', function() {
        $('.hierarchy-btn').removeClass('hierarchy-btn-actived')
        $(this).addClass('hierarchy-btn-actived')
    })    

})

function prepareAndSetGrid() {
    var tileWidth = $('#tile-width').val()
    var image = document.getElementById('image-preview')               

    var cols = Math.floor((image.naturalWidth / tileWidth))
    var rows = Math.floor((image.naturalHeight / tileWidth))

    setGrid(cols, rows)
}

function setImagePreview(event) {
    var reader = new FileReader()
    reader.onload = function() {
        var preview = $("#image-preview")
        preview.attr('src', reader.result)
    }

    reader.readAsDataURL(event.target.files[0])        
}

function setGrid(rows, columns) {
    
    var grid = $("#grid")    
    var imagePreview = $("#image-preview")  
    gridArray = []          
    
    grid.html("")

    grid.height(imagePreview.height())
    grid.css("margin-top", "-"+ imagePreview.height() +"px")
    
    for(var i = 0; i < rows; i++) {

        var newRow = "<tr>"
        var childArray = []

        for(var j = 0; j < columns; j++) {
            newRow += "<td class=\"grid-cell\" id=\"posI"+ i +"J"+ j +"\"><a class=\"cell\" href=\"javascript:selectCellAt("+ i +", "+ j +")\"></a></td>"
            childArray.push(0)
        }

        newRow += "</tr>"

        grid.append(newRow)
        gridArray.push(childArray)                
    }    

    $('#tile-size').html("Rows: "+ rows +" | Columns: "+ columns)
}

function selectCellAt(i, j) {
    
    var hierarchyLevelSelected = $('.hierarchy-btn-actived').attr('value')
    gridArray[i][j] = hierarchyLevelSelected

    if(hierarchyLevelSelected != 0) {
        $('#posI'+ i +'J'+ j).addClass('actived')

        $('#posI'+ i +'J'+ j+' a').css({'background-color': colorsArray[hierarchyLevelSelected - 1], 'opacity': '0.7'})
        
        setResult(gridArray)
        
    } else {        
        $('#posI'+ i +'J'+ j).removeClass('actived')
        $('#posI'+ i +'J'+ j+' a').css({'background-color': "transparent", 'opacity': '1'})
        
        gridArray[i][j] = 0
        setResult(gridArray)
    }
    
}

function setResult(result) {

    var resultToString = "[\n"

    for(var i = 0; i < result.length; i++) {

        resultToString += "\t["

        for(var j = 0; j < result[0].length; j++) {            
            
            if(j == (result[0].length - 1)) {

                if(i == (result.length - 1)) {
                    resultToString += result[i][j] +"]\n"
                    break
                }

                resultToString += result[i][j] +"],\n"
                break
            }           

            resultToString += result[i][j] +","
        }
        
    }
    

    resultToString += "]"
    
    $("#result").html(resultToString)
}