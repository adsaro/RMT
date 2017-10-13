const mongoose = require('mongoose');

var transaccionSchema = new mongoose.Schema({
  merchant_id: Number,	//Numérico 	12 	Es el número identificador del comercio en el sistema de PayU, este número lo encontrará en el correo de creación de la cuenta.
  state_pol: String, 	//Alfa numérico 	32 	Indica el estado de la transacción en el sistema.
  risk: Number, 	//Decimal (#.00) 	— 	El riesgo asociado a la transacción. Toma un valor entre 0 y 1. A mayor riesgo mayor valor. Viene en formato ###.00
  response_code_pol: String, 	//Alfa numérico 	255 	El código de respuesta de PayU.
  reference_sale: String, 	//Alfa numérico 	255 	Es la referencia de la venta o pedido. Deber ser único por cada transacción que se envía al sistema.
  reference_pol: String, 	//Alfa numérico 	255 	La referencia o número de la transacción generado en PayU.
  sign: String, 	//Alfa numérico 	255 	Es la firma digital creada para cada uno de las transacciones.
  extra1: String, 	//Alfa numérico 	255 	Campo adicional para enviar información sobre la compra. Ej. Descripción de la compra en caso de querer visualizarla en la página de confirmación.
  extra2: String, 	//Alfa numérico 	255 	Campo adicional para enviar información sobre la compra. Ej. Códigos internos de los productos.
  payment_method: Number, 	//Numérico 	— 	El identificador interno del medio de pago utilizado.
  payment_method_type: Number, 	//Numérico 	— 	El tipo de medio de pago utilizado para el pago
  installments_number: Number, 	//Numérico 	— 	Número de cuotas en las cuales se difirió el pago con tarjeta crédito.
  value: Number, 	//Numérico 	14,2 	Es el monto total de la transacción. Puede contener dos dígito: Number,s //decimales. Ej. 10000.00 ó 10000
  tax: Number, 	//Numérico 	14,2 	Es el valor del IVA de la transacción, si se envía el IVA nulo el sistema aplicará el 19% automáticamente. Puede contener dos dígito: Number,s //decimales. Ej: 19000.00. En caso de no tener IVA debe enviarse en 0.
  additional_value: Number, 	//Numérico 	14,2 	Valor Adicional no comisionable.
  transaction_date: Date, 	//Fecha (YYYY-MM-DD HH:mm:ss) 	— 	La fecha en que se realizó la transacción.
  currency: String, 	//Alfa numérico 	3 	La moneda respectiva en la que se realiza el pago. El proceso de conciliación se hace en pesos a la tasa representativa del día.
  email_buyer: String, 	//Alfa numérico 	255 	Campo que contiene el correo electrónico del comprador para notificarle el resultado de la transacción por correo electrónico. Se recomienda hacer una validación si se toma este dato en un formulario.
  cus: String, 	//Alfa numérico 	64 	El cus, código único de seguimiento, es la referencia del pago dentro del Banco, aplica solo para pagos con PSE
  pse_bank: String, 	//Alfa numérico 	255 	El nombre del banco, aplica solo para pagos con PSE.
  test: Buulean, 	//Lógico (true, false) 	— 	Variable para poder identificar si la operación fue una prueba.
  description: String, 	//Alfa numérico 	255 	Es la descripción de la venta.
  billing_address: String, 	//Alfa numérico 	255 	La dirección de facturación
  shipping_address: String, 	//Alfa numérico 	50 	La dirección de entrega de la mercancía.
  phone: String, 	//Alfa numérico 	20 	El teléfono de residencia del comprador.
  office_phone: String, 	//Alfa numérico 	20 	El teléfono diurno del comprador.
  account_number_ach: String, 	//Alfa numérico 	36 	Identificador de la transacción.
  account_type_ach: String, 	//Alfa numérico 	36 	Identificador de la transacción.
  administrative_fee: Number, 	//Decimal (#.00) 	— 	Valor de la tarifa administrativa
  administrative_fee_base: Number, 	//Decimal (#.00) 	— 	Valor base de la tarifa administrativa
  administrative_fee_tax: Number, 	//Decimal (#.00) 	— 	Valor del impuesto de la tarifa administrativa
  airline_code: String, 	//Alfa numérico 	4 	Código de la aerolínea
  attempts: Number, 	//Numérico 	— 	Numero de intentos del envío de la confirmación.
  authorization_code: String, 	//Alfa numérico 	12 	Código de autorización de la venta
  bank_id: String, 	//Alfa numérico 	255 	Identificador del banco
  billing_city: String, 	//Alfa numérico 	255 	La ciudad de facturación.
  billing_country: String, 	//Alfa numérico 	2 	El código ISO del país asociado a la dirección de facturación.
  commision_pol: Number, 	//Decimal (#.00) 	— 	Valor de la comisión
  commision_pol_currency: String, 	//Alfa numérico 	3 	Moneda de la comisión
  customer_number: Number, 	//Numérico 	— 	Numero de cliente.
  date: Date, 	//Fecha (YYYY-MM-DD HH:mm:ss) 	— 	Fecha de la operación.
  error_code_bank: String, 	//Alfa numérico 	255 	Código de error del banco.
  error_message_bank: String, 	//Alfa numérico 	255 	Mensaje de error del banco
  exchange_rate: Number, 	//Decimal (#.00) 	— 	Valor de la tasa de cambio.
  ip: String, 	//Alfa numérico 	39 	Dirección ip desde donde se realizó la transacción.
  nickname_buyer: String, 	//Alfa numérico 	150 	Nombre corto del comprador.
  nickname_seller: String, 	//Alfa numérico 	150 	Nombre corto del vendedor.
  payment_method_id: Number, 	//Numérico 	— 	Identificador del medio de pago.
  payment_request_state: String, 	//Alfa numérico 	32 	Estado de la solicitud de pago.
  pseReference1: String, 	//Alfa numérico 	255 	Referencia no. 1 para pagos con PSE.
  pseReference2: String, 	//Alfa numérico 	255 	Referencia no. 2 para pagos con PSE.
  pseReference3: String, 	//Alfa numérico 	255 	Referencia no. 3 para pagos con PSE.
  response_message_pol: String, 	//Alfa numérico 	255 	El mensaje de respuesta de PAYU.
  shipping_city: String, 	//Alfa numérico 	50 	La ciudad de entrega de la mercancía.
  shipping_country: String, 	//Alfa numérico 	2 	El código ISO asociado al país de entrega de la mercancía.
  transaction_bank_id: String, 	//Alfa numérico 	255 	Identificador de la transacción en el sistema del banco.
  transaction_id: String, 	//Alfa numérico 	36 	Identificador de la transacción.
  payment_method_name: String, 	//Alfa numérico
});

module.exports = mongoose.model('Transaccion', transaccionSchema);