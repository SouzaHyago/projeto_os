import puppeteer from "puppeteer";



export async function GET(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/ordem", {waitUntil: 'networkidle2'});
    const pdf = await page.pdf({format:'A4', printBackground : true})

    await browser.close()

    return new Response(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Ordem de Serviço.pdf"',
        },
      });
}