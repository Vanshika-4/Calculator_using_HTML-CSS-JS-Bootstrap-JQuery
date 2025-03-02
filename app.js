let operand_1_val = '';
let operand_2_val = '';
let arithmetic_operator = '';
let expression_result = 0;
let enter_val_display_refresh = false;
let expression_val_display_refresh = false;
let expression_exec_refresh = false;

$(document).ready(function(){

    $('#reset').on('click', function(){
        operand_1_val = '';
        arithmetic_operator = '';
        operand_2_val = '';
        expression_result = 0;
        expression_exec_refresh = false;

        $('#expression_display').html('');
        $('#val_display').html('');

        enter_val_display_refresh = false;
        expression_exec_refresh = false;
    });

    $('#backspace').on('click', function(){
        if(expression_exec_refresh){
            operand_1_val = '';
            arithmetic_operator = '';
            operand_2_val = '';
            expression_result = 0;
            expression_exec_refresh = false;

            $('#expression_display').html('');
            $('#val_display').html('');

            enter_val_display_refresh = false;
            expression_exec_refresh = false;
        }
        else{
            operand_2_val = operand_2_val.slice(0,-1);
            $('#val_display').html(operand_2_val);
        }
    });
    $('#equal_to').on('click', function(){
        if(operand_2_val == '')
            return false;

        var result = exec_operation(arithmetic_operator);

        $('#expression_display').html(operand_1_val+arithmetic_operator+operand_2_val+'=');
        $('#val_display').html(result);

        expression_result = result;
        operand_1_val = expression_result;
        expression_exec_refresh = true;
        enter_val_display_refresh = true;
        expression_val_display_refresh = true;
    });
});

function enter_val(val)
{
    if(expression_val_display_refresh && enter_val_display_refresh){
        expression_result = 0;
        expression_exec_refresh = false;
    }
    if(expression_val_display_refresh){
        operand_1_val = '';
        $('expression_display').html('');
        expression_val_display_refresh = false;
    }
    if(!enter_val_display_refresh){
        $('#val_display').append(val);
        operand_2_val += val;
    }
    else{
        $('#val_display').html(val);
        operand_2_val = val;
        enter_val_display_refresh = false; 
    }
}

function run_operation(operator){
    if(expression_exec_refresh == true){
        operand_1_val = '';
        arithmetic_operator = '';
        operand_2_val = expression_result;
        expression_val_display_refresh = false;
        expression_result = 0;
        expression_exec_refresh = false;
    }
    if(operand_2_val == ''){
        arithmetic_operator = operator;
        $('#expression_display').html(operand_1_val+arithmetic_operator);
        return false;
    }
    if(operand_1_val == '')
        operand_1_val = Number(operand_2_val);
    else
        operand_1_val = exec_operation(arithmetic_operator);
    arithmetic_operator = operator;

    enter_val_display_refresh = true;
    operand_2_val = '';

    $('#expression_display').html(operand_1_val+arithmetic_operator);
}

function exec_operation(operator){
    var result = 0;

    switch(operator){
        case '+':
            result = Number(operand_1_val) + Number(operand_2_val);
            break;
        case '-':
            result = Number(operand_1_val) - Number(operand_2_val);
            break;
        case '*':
            result = Number(operand_1_val) * Number(operand_2_val);
            break;
        case '/':
            result = Number(operand_1_val) / Number(operand_2_val);
            break;
        case '%':
            result = Number(operand_1_val) % Number(operand_2_val);
            break;
        default:
            result = 0;
    }
    return result;
}