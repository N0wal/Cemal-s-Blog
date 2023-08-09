import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs')

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs!" />}{/*Buradaki blogs && yazmamızın sebebi, eğer buraya bir kontrol getirmezsek, yukarda başlangıç değerini null verdiğimiz blogs değişkenini BlogList.js dosyasında maplemeye çalışıyor olacaktık. Bundan dolayı da hatayla karşılaşacaktık. Yani değeri null olan bir değişkeni maplemeye çalışacaktık. Bundan dolayı buraya bir 've' yani && kontrolü koyarak şunu yapmış oluyoruz; JavaScript'te bir 've' yani && kontrolü yapmak istiyoruz. Soldaki yani blogs değişkenimize baktı ve null olduğunu gördü. Sağdaki değeri hiç okumadan kontrolü geçer. Ancak blogs değeri db.json dosyasından veriyi çektikten sonra değişecek ve blogs değişkeninin 've' kontrolünden gelen değer 1 olacak. Böylece kontrolün sağındakini okuyacak ve böylece db.json dosyasından veriyi çekene kadar geçmiş olan süreyi bu şekilde aradan çıkartmış oluyoruz. Yani BlogList'i çalıştırmak, renderlamak için blogların fetch'lenmesini bekliyoruz. Soldaki veri true olduğu zaman, sağdaki kodları çalıştırıyor. */}
        </div>
    );
}

export default Home;