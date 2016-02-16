'use restrict';
import FluxCartActions from '../actions/flux-cart-actions';

export default {

    // Load mock product data from localStorage into ProductStore via Action
    getProductData() {
        var data = JSON.parse(localStorage.getItem('product'));
        FluxCartActions.receiveProduct(data);
    }

};