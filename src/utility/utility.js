import React from 'react';
import { Tag } from '../components/tags/tags';

/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text
    .split(' ')
    .slice(0, size)
    .join(' ')}...`;
};

const format_rupiah = (angka, prefix) =>{
  if(!angka) return;
  let number_string = parseFloat(angka).toString().replace(/[^,\d]/g, '');
  let split   = number_string.split(',')
  let sisa     = split[0].length % 3
  let rupiah     = split[0].substr(0, sisa)
  let ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
  
  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
  let separator = sisa ? '.' : '';
  rupiah += separator + ribuan.join('.');
  }
  
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

const day_tanslate = (name, lang='id') => {
  if(lang == 'id') {
    switch(name) {
      case 'monday': return 'Senin';
      case 'tuesday': return 'Selasa';
      case 'wednesday': return 'Rabu';
      case 'thursday': return 'Kamis';
      case 'friday': return 'Jumat';
      case 'saturday': return 'Sabtu';
      case 'sunday': return 'Minggu';
      default: return name;
    }
  } else {
    return name;
  }
}

const label_apstatus = (status) => {
  if(!status) return;
  if(status == 'waiting_consul') {
    return <Tag color="#4347D9">Menunggu Konsultasi</Tag>
  } else if ( status == 'waiting_payment' ) {
    return <Tag color="#ea8519">Menunggu Pembayaran</Tag>
  } else if ( status == 'done' ) {
    return <Tag color="#47bc14">Selesai Konsultasi</Tag>
  } else if ( status == 'payment_cancel' ) {
    return <Tag color="#f50">Pembayaran Dibatalkan</Tag>
  } else return status;
}

const payment_label = (status) => {
  if(!status) return;
  if(status == 'expire') {
    return <Tag color="#4347D9">Kedaluwarsa</Tag>
  } else if ( status == 'cancel' ) {
    return <Tag color="#f50">Dibatalkan</Tag>
  } else if ( status == 'paid' ) {
    return <Tag color="#47bc14">Lunas</Tag>
  } else if ( status == 'waiting_payment' ) {
    return <Tag color="#ea8519">Menunggu Pembayaran</Tag>
  } else return status;
}

const maskingInputTime = (e) => {

  if(e.keyCode === 8) return; /// delete

  let value = e.target?.value,
      format = null,
      last_char = parseInt(value.substr(value.length - 1)),
      first_char = parseInt(value.substr(0,1));
      
      if(last_char === NaN) {
        return;
      }

      if(value.length === 1 && parseInt(value) > 2) {
        format = null;
      }
      else if(value.length === 2) {
        if(first_char === 2 && last_char > 3) format = first_char;
        else format = value + ':';
      }
      else if (value.length === 4) {
        if(last_char > 5) format = value.substr(0,3);
        else format = value;
      }
      else if(value.length > 5) {
        format = value.substring(0,5);
      } else {
        format = value;
      }
  e.target.value = format
}

const maskingInputDate = (e) => {
  if(e.keyCode === 8) return; /// delete

  let value = e.target?.value,
      format = null,
      last_char = parseInt(value.substr(value.length - 1));

      if(value.length === 1 && parseInt(value) > 2) {
        format = null;
      }
      else if(value.length === 4) {
        format = value + '-';
      } else if(value.length === 7) {
        format = value + '-';
      } else if(value.length > 10) {
        format = value.substr(0, 10);
      } else {
        format = value;
      }
  e.target.value = format
}

const uri_segment = (index) => {
  let loc = document.URL,
      split = loc.split('/');

      index += 2;

  if(typeof split[index] == 'undefined') return false;
  else return split[index];
}

const createParams = (params) => {
  const qs = Object.keys(params)
  .map(key => `${key}=` + (!params[key] ? '' : params[key]))
  .join('&');
  return qs;
}

export {
  ellipsis,
  format_rupiah,
  day_tanslate,
  label_apstatus,
  maskingInputTime,
  uri_segment,
  payment_label,
  maskingInputDate,
  createParams
};
