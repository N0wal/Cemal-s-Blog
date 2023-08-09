import { useState, useEffect } from "react";

const useFetch /* Bu dosya bir React hook örneği, ve hook olarak kullanılacak olan fonksiyonlar 'use' ile başlamalıdır. Aksi takdirde hook çalışmaz. */ = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {      /* Bu satırda setTimeout koymamızın sebebi şu; Normalde fetch işleminin işlenmesi belirli bir süre alır. Ancak bizim yaptığımız uygulamada veritabanının local olması yani farklı bir serverdan veri çekmek yerine local bir serverdan veri çektiğimiz için bu işlemin süresi yok denecek kadar kısa. Burada fetch işlemini göndermeden önce bir timeout koyuyoruz ki gerçekçi izlenim versin. setTimeout methodu sayesinde anasayfada yaptığımız her yenileme işlemi yani yeniden renderlama işleminden sonra ekranda bir saniyelik bir timeout oluyor. Home.js dosyasında da isPending && sorgulaması ile timeout süresi boyunca ekranda Loading... yazdırdık. Bu sayede uygulamamız daha gerçeği yansıtan bir uygulama oldu. */
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource')
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data)
                    setIsPending(false);
                    setError(null)
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Fetch aborted by user')
                    } else {
                        console.log(err.message);
                        setError(err.message);
                        setIsPending(false);
                    }
                })
        }, 1000);

        return () => abortCont.abort();
    }, [url]);
    /* buradaki useEffect fonksiyonundan sonra [name] dependency'sini vermemiz, useEffect altına yazılan kodların [name] değişkenini izlemeye almasını sağladı. Bundan dolayı bu fonksiyon yalnızca [name] değişkeni değiştiği zaman çalışacak. Böylece yukarıdaki örnekteki gibi useEffect fonksiyonunun nasıl kontrol edildiğini görebiliriz. */
    return { data, isPending, error }
}

export default useFetch;