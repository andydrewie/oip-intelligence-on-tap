// Decimal input semantics, rounded once to cents (half away from zero).
// BigInt avoids binary half-cent drift; never round a percentage to cents.
function decimal(value) {
 const [mantissa,exponent='0']=String(value).toLowerCase().split('e');
 const [whole,fraction='']=mantissa.split('.');
 const scale=fraction.length-Number(exponent);
 const coefficient=BigInt(whole+fraction);
 return scale>=0?[coefficient,BigInt(10)**BigInt(scale)]:[coefficient*BigInt(10)**BigInt(-scale),BigInt(1)];
}
function roundedRatio(numerator,denominator) {
 const negative=numerator<BigInt(0),n=negative?-numerator:numerator;
 const whole=n/denominator,remainder=n%denominator;
 const rounded=whole+(remainder*BigInt(2)>=denominator?BigInt(1):BigInt(0));
 return Number(negative?-rounded:rounded);
}
export function cents(value) {
 const n=Number(value);if(!Number.isFinite(n))return n;
 const [numerator,denominator]=decimal(n);
 return roundedRatio(numerator*BigInt(100),denominator)/100;
}
export function percentageCharge(amount,rate) {
 if(!Number.isFinite(Number(amount))||!Number.isFinite(Number(rate)))return NaN;
 const [a,ad]=decimal(Number(amount)),[r,rd]=decimal(Number(rate));
 // /100 for percentage and ×100 for cents cancel before rounding.
 return roundedRatio(a*r,ad*rd)/100;
}
