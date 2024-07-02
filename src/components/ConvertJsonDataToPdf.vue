<template>
  <div class="hello">
    <div @click="bbbb" style="cursor: pointer;">点击生成pdf</div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    bbbb() {
      const jsonData = {
        name: "John Doe",
        age: 30,
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345"
        },
        hobbies: ["reading", "travelling", "swimming"]
      };

      // 创建PDF文档
      const doc = new jsPDF();

      // 添加标题
      doc.setFontSize(18); // 设置下一个setFontSize之前的所有文字的字体大小
      doc.text("User Information", 14, 22); // 设置文字，(文字，左边的距离，上边的距离)
      doc.setLineWidth(0.25); // 设置下划线的粗细
      doc.line(0, 24, 14, 24); // 添加标题下划线，(左边的距离，下划线头部跟上边的距离，长度，下划线尾部跟上边的距离)

      // 添加基本信息
      doc.setFontSize(12);
      doc.text("Name: " + jsonData.name, 14, 32);
      doc.line(14, 34, 196, 34); // 添加下划线
      doc.text("Age: " + jsonData.age, 14, 40);
      doc.line(14, 42, 196, 42); // 添加下划线

      // 添加地址信息
      doc.setFontSize(14);
      doc.text("Address", 14, 50);
      doc.line(14, 52, 196, 52); // 添加下划线
      doc.setFontSize(12);
      doc.text("Street: " + jsonData.address.street, 14, 58);
      doc.line(14, 60, 196, 60); // 添加下划线
      doc.text("City: " + jsonData.address.city, 14, 66);
      doc.line(14, 68, 196, 68); // 添加下划线
      doc.text("State: " + jsonData.address.state, 14, 74);
      doc.line(14, 76, 196, 76); // 添加下划线
      doc.text("ZIP: " + jsonData.address.zip, 14, 82);
      doc.line(14, 84, 196, 84); // 添加下划线

      // 添加爱好列表
      doc.setFontSize(14);
      doc.text("Hobbies", 14, 92);
      doc.line(14, 94, 196, 94); // 添加下划线
      doc.setFontSize(12);
      jsonData.hobbies.forEach((hobby, index) => {
        doc.text((index + 1) + ". " + hobby, 14, 100 + index * 8);
        doc.line(14, 102 + index * 8, 196, 102 + index * 8); // 添加下划线
      });
      // 绘制边框
      doc.setLineWidth(0.5);
      doc.rect(14, 130, 182, 130); // 边框参数分别为x, y, 宽度, 高度

      // 保存PDF文件
      doc.save('output.pdf');
    }
  }
}
</script>

<style scoped></style>
