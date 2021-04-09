$(document).ready(function() {
    //Link pa and pA
    $("#pa").on("input", function() {
        var pa = $(this).val();
        if ((!isNaN(pa) && pa.length > 0)) {
            if (pa >= 0 && pa <= 1) {
                $("#pA").val(exactMath.sub(1,parseFloat(pa)));
            } else {
                $("#pA").val("Out of range");
            }
        } else {
            $("#pA").val(NaN);
        }
    });
    $("#pA").on("input", function() {
        var pA = $(this).val();
        if ((!isNaN(pA) && pA.length > 0)) {
            if (pA >= 0 && pA <= 1) {
                $("#pa").val(exactMath.sub(1,parseFloat(pA)));
            } else {
                $("#pa").val("Out of range");
            }
        } else {
            $("#pa").val(NaN);
        }
    });

    //Calculate pa'
    function calculate() {
        var result = "";
        var equilibrium = "";
        var pa = $("#pa").val();
        var pA = $("#pA").val();
        var waa = $("#w_aa").val();
        var wAa = $("#w_Aa").val();
        var wAA = $("#w_AA").val();

        if (!isNaN(pa) && !isNaN(pA) && !isNaN(waa) && !isNaN(wAa) && !isNaN(wAA) &&
          pa.length > 0 && pA.length > 0 && waa.length > 0 && wAa.length > 0 && wAA.length > 0) {
            pa = parseFloat(pa);
            pA = parseFloat(pA);
            waa = parseFloat(waa);
            wAa = parseFloat(wAa);
            wAA = parseFloat(wAA);

            var aa = exactMath.mul(pa, pa, waa);
            var Aa = exactMath.mul(pA, pa, wAa);
            var AA = exactMath.mul(pA, pA, wAA);
            var s1 = exactMath.sub(wAa, wAA);
            var s2 = exactMath.sub(wAa, waa);

            result = "<strong><span style=\"color:green\">" +
                        exactMath.div(exactMath.add(aa, Aa), exactMath.add(aa, Aa, Aa, AA)) +
                        "</span></strong>";
            if ((wAA >= wAa && wAa > waa) || (wAA > wAa && wAa >= waa)) {
                equilibrium = "Equilibrium frequency of a: 0";
            } else if ((waa >= wAa && wAa > wAA) || (waa > wAa && wAa >= wAA)) {
                equilibrium = "Equilibrium frequency of a: 1";
            } else {
                equilibrium = "Equilibrium frequency of a: " +
                                exactMath.div(s1, exactMath.add(s1,s2));
                if (wAa < waa && wAa < wAA) {
                    equilibrium += " (unstable)";
                }
            }
        } else {
            result = "<strong><span style=\"color:red\">Invalid input</span></strong>";
        }

        $("#result").html(result);
        $("#equilibrium").text(equilibrium);

    }

    $("#calculate").click(function() {
        calculate();
    });

    $("#set").click(function() {
        var pa_prime = $("#result").text();
        $("#pa").val(pa_prime);
        $("#pA").val(exactMath.sub(1, pa_prime))
        calculate();
    });
});