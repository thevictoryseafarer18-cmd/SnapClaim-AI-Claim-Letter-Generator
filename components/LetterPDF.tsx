import {Document,Page,Text,StyleSheet} from "@react-pdf/renderer";
const s=StyleSheet.create({page:{padding:64,fontFamily:"Times-Roman",fontSize:11.5,lineHeight:1.5},p:{marginBottom:10}});
export default function LetterPDF({text}:{text:string}){
 return(<Document><Page size="LETTER" style={s.page}>
  {text.split(/\n{2,}/).map((para,i)=><Text key={i} style={s.p}>{para}</Text>)}
 </Page></Document>);
}
