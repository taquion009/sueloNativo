const validateForm = (name, value) => {
let error = false;
switch (name) {
    case 'billing_first_name':
    error = value.length < 1;
    break;
    case 'billing_last_name':
    error = value.length < 1;
    break;
    case 'email':
    error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    break;
    case 'id_type':
    error = value.length < 3;
    break;
    case 'billing_state':
        error = value.length < 1 
    break;
    case 'billing_city':
    error = value.length < 3;
    break;
    case 'billing_address_1':
    error = value.length < 3;
    break;
    case 'envio':
    error = value.length < 3;
    break;
    case 'checkPolite':
    error = value !== true
    break;
    case 'billing_':
    error = value.length < 1 || !/^\d+$/.test(value);
    break;
    case 'billing_address_2':
    error = value.length < 1 || !/^\d+$/.test(value);
    break;
    case 'phone':
    error = value.length < 3 || !/^\d+$/.test(value);
    break;
    case 'zip':
    error = value.length < 1 || !/^\d+$/.test(value);
    break;
    default:
    break;
}

return error;
};

export default validateForm;