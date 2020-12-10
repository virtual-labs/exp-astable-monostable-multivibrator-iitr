
jsPlumb.ready(function () {

    var instance,
        discs = [],

        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumb.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
               
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
         endpoint = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 7, stroke: "rgba(198,89,30,0.7)" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);

            return instance.addEndpoint(elId, endpoint);
        },

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("animation-demo").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = screen.width - 162, h = screen.height - 200;
            var x = (5 * w) + Math.floor(Math.random() * (10 * w));
            var y = (5 * h) + Math.floor(Math.random() * (10 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumb instance, setting some appropriate defaults and a Container.
    instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: "littledot.png" } ],
        Connector: [ "Bezier", { curviness: -90 } ],
        Container: "canvas"
    });

    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("ld1"),
            e2 = prepare("ld2"),
            e3 = prepare("ld3"),
            e4 = prepare("ld4"),
            e5 = prepare("ld5"),
            e6 = prepare("ld6"),
            e7 = prepare("ld7"),
            e8 = prepare("ld8")
           
            clearBtn = jsPlumb.getSelector("#anim-clear"),
            addBtn = jsPlumb.getSelector("#add");

         var detachLinks = jsPlumb.getSelector(".littledot .detach");
            instance.on(detachLinks, "click", function (e) {
                instance.deleteConnectionsForElement(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            instance.on(document.getElementById("clear"), "click", function (e) {
                instance.detachEveryConnection();
                showConnectionInfo("");
                jsPlumbUtil.consume(e);
            });
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

    document.getElementById("check-button").addEventListener("click", function () {
        //var d = instance.exportData();
        //console.log(instance.getAllConnections());

        var correct_connections_1_7 = [
            {
                "source": "ld1",
                "target": "ld7"
            },

            {
                "source": "ld7",
                "target": "ld1"
            }
        ];

        var correct_connections_2_8 = [
            {
                "source": "ld2",
                "target": "ld8"
            },

            {
                "source": "ld8",
                "target": "ld2"
            }
        ];        

        var correct_connections_3_5 = [
            {
                "source": "ld3",
                "target": "ld5"
            },
    
            {
                "source": "ld5",
                "target": "ld3"
            }
        ];

        var correct_connections_4_6 = [
            {
                "source": "ld4",
                "target": "ld6"
            },

            {
                "source": "ld6",
                "target": "ld4"
            }
        ];

        
        //a connection outside this will invalidate the circuit
        var allowed_connections = [
            {
                "source": "ld1",
                "target": "ld7"
            },
    
            {
                "source": "ld7",
                "target": "ld1"
            },
            
            {
                "source": "ld2",
                "target": "ld8"
            },

            {
                "source": "ld8",
                "target": "ld2"
            },

            {
                "source": "ld3",
                "target": "ld5"
            },

            {
                "source": "ld5",
                "target": "ld3"
            },

            {
                "source": "ld4",
                "target": "ld6"
            },

            {
                "source": "ld6",
                "target": "ld4"
            }
        ];

        var actual_connections = instance.getAllConnections();

        var is_connected_1_7 = false;
        var is_connected_2_8 = false;
        var is_connected_3_5 = false;
        var is_connected_4_6 = false;
        var unallowed_connection_present = false;
        var count =0;

        //checking for 1_3 connection
        actual_connections.forEach(function (connection) {
            count++;
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_1_7){
                is_connected_1_7 = correct_connections_1_7.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

            if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return (conn.source === this_connection.source && conn.target === this_connection.target);
                }));
            }
            // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });

        //checking for 2_4 connection
        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_2_8){
                is_connected_2_8 = correct_connections_2_8.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });

        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_3_5){
                is_connected_3_5 = correct_connections_3_5.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });

        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_4_6){
                is_connected_4_6 = correct_connections_4_6.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });


        if (is_connected_1_7 && is_connected_2_8 && is_connected_3_5 && is_connected_4_6 && !unallowed_connection_present) {
             document.getElementById('range').disabled = false;
             document.getElementById("calc").disabled = false;
             document.getElementById("pr").disabled = false;
             document.getElementById("add").disabled = false;
            alert("RIGHT CONNECTION");
            } 
            else {

                alert("WRONG CONNECTION");
                return;
            }   
    });
});
var slider = document.getElementById("range");
            var output = document.getElementById("demo");
            output.innerHTML = slider.value;   
            slider.oninput = function() {
            output.innerHTML = this.value;
                }



                var n = 1;
                var xx = [];
                var yy = [];
                var E;
                var C;
                var X;
                var O;
                var T;
                var P;
                var M;
                var N;
                var D;
                var F;
                var B;
                var result;   

function cal() {
                
                   E=parseFloat(document.getElementById("range").value);
                   C=parseFloat(0.1);
                   P=parseFloat(3.9);
                   M=E+(2*P);
                   N=E+P;
                   O=0.69*M*C;
                   D=N/M*100;
                   F=1/O;
                   T=0.69*N*C;
                   B= T;   


                   var datapoints1 = [];
                   var datapoints2 = [];
	

                   for(i=0;i<=(T*10);i=i+(T*10))
                   {
                       datapoints1.push({ x: i, y: 6*(1-(Math.exp(-i/T*1000))) });
                   }
           
                   for(i=(T*10);i<=(O*10);i=i+((O-T)*10))
                   {
                        datapoints1.push({ x: i, y: 6*(Math.exp(-i/O*1000)) });
                   }

                   drawgraph("l1", datapoints1, "Time(t*10s)", "capacitor voltage(V)");


							datapoints2.push({ x: 0, y: 0 });
							datapoints2.push({ x: 0, y: 1 });
							datapoints2.push({ x: B*10, y: 1 });
							datapoints2.push({ x: B*10, y: 0 });
							datapoints2.push({ x: O*10, y: 0 });

                   graphline("l2", datapoints2, "Time(t*10s)", "Output voltage(V)");



                   document.getElementById("result").innerHTML=B.toFixed(3);

           
               
                   
              }

function Add()
                  {
                   
                    var table = document.getElementById("mytable");


                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(-1);
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);


                   
                    cell1.innerHTML = n++;
                    cell2.innerHTML =E;
                    cell3.innerHTML =P;
                    cell4.innerHTML =C;
                    cell5.innerHTML =T.toFixed(3);
                    cell6.innerHTML =O.toFixed(3);
                    cell7.innerHTML =D.toFixed(2);
                    cell8.innerHTML =F.toFixed(2);

                }



     
              function dropdown() {
                  document.getElementById("myDropdown").classList.toggle("show");
              }
              
              // Close the dropdown if the user clicks outside of it
              window.onclick = function(event) {
                if (!event.target.matches('.dropbtn')) {
              
                  var dropdowns = document.getElementsByClassName("dropdown-content");
                  var i;
                  for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                      openDropdown.classList.remove('show');
                    }
                  }
                }
              }
              
              function pr() {
                window.print();
              }
              
              