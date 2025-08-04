import { parseSmallMenu } from "./Components/SmallMenu/Parse";

const html = `
 <ul>
    <li><a href="https://blog.adobe.com/en/topics/creativity">Creativity</a></li>
    <li><a href="https://blog.adobe.com/en/topics/digital-transformation">Digital Transformation</a></li>
    <li><a href="https://blog.adobe.com/en/topics/trends--research">Trends &#x26; Research</a></li>
    <li><a href="https://blog.adobe.com/en/topics/future-of-work">Future Of Work</a></li>
    <li><a href="https://blog.adobe.com/en/topics/leadership">Leadership</a></li>
    <li><a href="https://blog.adobe.com/en/topics/customer-stories">Customer Stories</a></li>
    <li><a href="https://blog.adobe.com/en/topics/events">Events</a></li>
  </ul>
  <div class="gnav-promo card">
    <div>
      <div>
        <p>
          <picture>
            <source type="image/webp" srcset="./media_1e4fd0612bd74434042808e7594eb908ecbd32b1a.png?width=2000&#x26;format=webply&#x26;optimize=medium" media="(min-width: 600px)">
            <source type="image/webp" srcset="./media_1e4fd0612bd74434042808e7594eb908ecbd32b1a.png?width=750&#x26;format=webply&#x26;optimize=medium">
            <source type="image/png" srcset="./media_1e4fd0612bd74434042808e7594eb908ecbd32b1a.png?width=2000&#x26;format=png&#x26;optimize=medium" media="(min-width: 600px)">
            <img loading="lazy" alt="" src="./media_1e4fd0612bd74434042808e7594eb908ecbd32b1a.png?width=750&#x26;format=png&#x26;optimize=medium" width="1214" height="1082">
          </picture>
        </p>
        <p>Adobe MAX 2024 - The Creativity Conference</p>
        <p>Creativity unites us all. Join us in-person Miami Beach October 14-16 or attend online.</p>
        <p><a href="https://max.adobe.com/">Register now</a></p>
      </div>
    </div>
  </div>
`;

const largeMenu = document.createRange().createContextualFragment(html);

const container = document.createElement('div');
container.append(largeMenu);

const sm = parseSmallMenu(container);

console.log(sm);

