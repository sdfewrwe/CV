
var margin  = {top: 50, right: 10, bottom: 10, left: 100},
    width   = 1400-margin.left-margin.right,
    height  = 900-margin.top-margin.bottom;   

var svg = d3.select("body").append("svg")
  .attr("width",width)
  .attr("height",height);


var etiqueta = d3.select('body').append('div') .attr("class","etiqueta")
      .style({
        'background' : 'black',
        'color':'white',
        'width':"150px",
        'height':"100px",
        });

d3.json("https://raw.githubusercontent.com/sdfewrwe/CV/main/data.json",function(data){ 
  // Extraer datos del archivo JSON (revisar repositorio)
  var nodes = data["nodes"];
  var links = data["links"];
  var force = d3.layout.force()
    .size([width,height])
    .nodes(d3.values(nodes))
    .links(links)
    .on("tick",tick)

    .linkDistance(350)
    .start();
  

  var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr("class","link");
  
  // Aquí le asigno la imagen del círculo al nodo.
  var node = d3.select('#bolitas').selectAll('img')
    .data(force.nodes())
    .enter().append('img')
    .attr('class', function (d) { return 'bolita  '})
  //Esto es para hacer hover sobre los nodos y que se muestren los datos
    .on('mouseover', mouseoverHandler)
    .on("mousemove",mouseMoving)
    .on("mouseout", mouseoutHandler);
  
  
  function tick(e){
     
     node.style('left', function (d) { return d.x + 'px'; })
         .style('top', function (d) { return d.y + 'px'; })
         .call(force.drag);
    
    
    link.attr('x1', function(d){ return  d.source.x})
        .attr('y1',function(d){ return  d.source.y})
        .attr('x2', function(d){ return  d.target.x})
        .attr('y2',function(d){ return   d.target.y})
  }
  
  //Hover
  //La etiqueta se muestra
  function mouseoverHandler (d) {
     etiqueta.transition().style('opacity', .9)
     etiqueta.html('<p>' + d["nombre"] + '</p>' );
  }

    //Quitar hover
  //La etiqueta se oculta
  function mouseoutHandler (d) {
      tooltip.transition().style('opacity', 0);
  }

  function mouseMoving (d) {
      tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").style("color","white");
  }
})