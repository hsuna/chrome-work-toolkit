let requestKey = ""
let returnKey = ""

export function requestEncrypt(data, key = "") {
  requestKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(requestKey)) return
  let base_e_str = Buffer.from(data).toString('base64')
  let t = base_e_str + requestKey
  let len = t.length
  let per = Math.floor(len / 6)
  let per_0 = per - 1
  let i = 0
  let t_len = len
  let arr_per = []
  let arr_per_0 = []
  let arr_last = []
  let t_start = 0

  if (per < 2) {
    return {
      base64_encode: base_e_str,
      e: encodeURIComponent(t)
    }
  }

  while (true) {
    if (i % 2 === 0) {
      if (t_len / per_0 > 1) {
        arr_per_0.push(t.substr(t_start, per_0))
      } else {
        arr_last.push(t.substr(t_start))
        break
      }
      t_start += per_0
      t_len = t_len - per_0
    } else {
      if (t_len / per > 1) {
        arr_per.push(t.substr(t_start, per))
      } else {
        arr_last.push(t.substr(t_start))
        break
      }
      t_start += per
      t_len = t_len - per
    }
    i++
  }
  return {
    base64_encode: base_e_str,
    e: encodeURIComponent(arr_last.join("") + arr_per.join("") + arr_per_0.join(""))
  }
}

export function returnDecrypt(data, key = "") {
  returnKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(returnKey)) return
  let t = decodeURIComponent(data)
  let len = t.length
  let per = Math.floor(len / 4)
  let len_key
  let base64_estr
  if (per < 2) {
    len_key = returnKey.length
    base64_estr = t.substr(0, len - len_key)
    return {
      base64_encode: base64_estr,
      d: Buffer.from(base64_estr, 'base64').toString()
    }
  }
  let i = 0
  let t_len = len
  let arr_per_num = []
  while (true) {
    if (t_len / per > 1) {
      arr_per_num.push(per)
    } else {
      break
    }
    t_len = t_len - per
    i++
  }
  let arr_per = []
  let t_start = 0
  let t_count = arr_per_num.length
  arr_per_num.forEach((v, i) => {
    t_start -= per
    arr_per[t_count - 1 - i] = t.substr(t_start, per)
  })

  let last_str = t.substr(0, len + t_start)
  i = 0
  let max = arr_per.length
  let str = ""
  for (i = 0; i < max; i++) {
    if (arr_per[i]) {
      str += arr_per[i]
    }
  }
  str += last_str
  len_key = returnKey.length
  str = str.substr(0, len - len_key)
  return {
    base64_encode: str,
    d: Buffer.from(str, 'base64').toString()
  }
}

export function requestDecrypt(data, key = "") {
  requestKey = key
  if (!/^[0-9a-zA-Z]{1,}$/.test(requestKey)) return
  let t = decodeURIComponent(data)
  let len = t.length
  let per = Math.floor(len / 6)
  let per_0 = per - 1
  let i = 0
  let t_len = len
  let arr_per_0_num = []
  let arr_per_num = []
  let len_key
  let base64_estr
  if (per < 2) {
    len_key = requestKey.length
    base64_estr = t.substr(0, len - len_key)
    return {
      base64_encode: base64_estr,
      d: Buffer.from(base64_estr, 'base64').toString()
    }
  }
  while (true) {
    if (i % 2 === 0) {
      if (t_len / per_0 > 1) {
        arr_per_0_num.push(per_0)
      } else {
        break
      }
      t_len = t_len - per_0
    } else {
      if (t_len / per > 1) {
        arr_per_num.push(per)
      } else {
        break
      }
      t_len = t_len - per
    }
    i++
  }

  let arr_per_0 = []
  let arr_per = []
  let t_start = 0

  let t_count = arr_per_0_num.length

  arr_per_0_num.forEach((v, i) => {
    t_start -= per_0
    arr_per_0[t_count - 1 - i] = t.substr(t_start, per_0)
  })

  t_count = arr_per_num.length
  arr_per_num.forEach((v, i) => {
    t_start -= per
    arr_per[t_count - 1 - i] = t.substr(t_start, per)
  })

  let last_str = t.substr(0, len + t_start)

  i = 0
  let max = Math.max(arr_per_0.length, arr_per.length)
  let str = ""
  for (i = 0; i < max; i++) {
    if (arr_per_0[i]) {
      str += arr_per_0[i]
    }

    if (arr_per[i]) {
      str += arr_per[i]
    }
  }

  str += last_str
  len_key = requestKey.length
  str = str.substr(0, len - len_key)
  return {
    base64_encode: str,
    d: Buffer.from(str, 'base64').toString()
  }
}
