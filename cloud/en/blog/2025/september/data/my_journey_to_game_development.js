const data = [
    {
        el: "h1",
        content: "Welcome",
        props: [
            {
                title: "Welcome in my first post",
            }
        ]
    },

    {
        el: "p",
        content: "Hello, I am Chauhan Pruthviraj, and I would like to share how I developed an interest in becoming a game developer, what inspired me, and why I took such a difficult decision. I know that I cannot be sure whether I will be successful, but I do know that I should at least try. The path I have chosen is tough and challenging, but if I succeed, it will be highly rewarding and fulfilling.",
    },
    {
        el: "p",
        content: "When I was young, I often visited my uncle's house during vacations. They had a TV, which kept me entertained. We didn’t have a TV at my house, so I used to play local games with my friends. At my uncle's place, I would watch interesting movies, sometimes on Discovery Channel or educational programs to gain knowledge. My uncle also bought a video game console, which was very popular at that time and connected it to the TV. I started playing games on it, and I really liked it. My favorite game became Super Mario, and I played it so much that my mom had to remind me to take breaks and eat."
    },
    {
        el: "p",
        content: "I enjoyed playing Mario so much that I would spend hours on it. I often wondered how the images on the TV screen appeared. I tried to figure it out but couldn’t because I had no resources or anyone knowledgeable around me to explain how it worked. Back then, it wasn’t anyone's fault; even today, it’s hard for professors to explain such things easily because they don’t always know how it works themselves."
    },
    {
        el: "p",
        content: "I was fascinated by how things like clouds, enemies, and other objects appeared in games and where they went. It felt like a magical world to me."
    },
    {
        el: "p",
        content: "At that time, I didn’t know about game development and never thought about becoming a game developer to create these games. I always wanted to customize the games, especially when I got stuck on difficult levels in Mario."
    },
    {
        el: "p",
        content: "As I grew older, technology also advanced. My first mobile phone was a Nokia with a keypad, and it had the Snake game. Over time, mobile phones became more advanced and began to replace video game consoles. Computers were still the most popular devices for playing advanced games like GTA Vice City, which provided a very realistic experience. But as mobile technology improved with better RAM and graphics, games on mobile phones started to improve too. Initially, Symbian OS didn’t have many good games, but when Android arrived, it changed everything. Early Android games like DR Driving were very popular. The developers made them so well that they ran smoothly even on low RAM, giving a realistic experience."
    },
    {
        el: "p",
        content: "Games like Subway Surfer, Car Racing 3D, and BMX Boys were also popular, and I played all of them. Gradually, mobile phones became even more powerful, and now I have a 12GB RAM phone that can run any game smoothly. I have played PUBG, Gangstar Rio, Freefire, WCC2, WCC3, and Real Cricket 20 and 22, all of which I really enjoyed."
    },
    {
        el: "p",
        content: "Today, I have the resources and internet access to learn how to create games. I can customize games now if I want, but to do that, I need to learn game development and programming languages."
    },
    {
        el: "p",
        content: "I have always had a strong interest in creating games, and after a lot of research, I realized that it is not possible to become a game developer using just a mobile phone. You need a computer for learning game development. I didn’t have a computer before, but now I do, and I am trying to learn the skills required to become a game developer."
    },
    {
        el: "p",
        content: "The first thing you need to learn is programming languages. C++, C#, and Java are heavily used in game development, especially for native games. You can say that C++ is the heart of game engines. The core parts of Unity and Unreal engines are written in C++ because it’s fast and can work close to the hardware. Manual memory management makes programs more efficient, allowing games to run faster and with better graphics, which makes them look more realistic."
    },
    {
        el: "p",
        content: "I started learning C++ first, and I really enjoyed it because it taught me how computer memory works deeply. After learning C++, I can easily learn other programming languages and have a better understanding of OOP (Object-Oriented Programming). Although I’m not an expert, I have a solid grasp of C++, and it has helped me understand many programming concepts."
    },
    {
        el: "p",
        content: "After further research and reading several articles, I found out that learning a game engine is also important for becoming a game developer. However, using a game engine is optional. It can make game development much easier, but it’s not necessary. You can create your own game engine or SDK. You just need to understand the whole game development process and do everything on your own."
    },
    {
        el: "p",
        content: "I learned C++ programming on Linux because Linux provides easy access to compilers and code editors, and it was much easier to learn C++ compared to Windows. As my research progressed, I learned what else I needed to develop games, and I realized that to create a game, I needed to learn the following:"
    },
    {
        el: "ul",
        content: [
            "C++ programming",
            "Window creation (SDL)",
            "OpenGL / Vulkan (to load 3D objects into the window)",
            "Algebra, matrices, and math for graphics (for physics, collision detection, etc.)",
            "Deep graphics programming for realistic graphics"
        ]
    },
    {
        el: "p",
        content: "Most of the libraries I have chosen are free. C++ programming is free, and you can use compilers like GNU C++ or Clang. I now use Clang. For window creation, you can use the SDL library, which I prefer. Initially, I liked GLFW, but I switched to SDL because it offers more features like audio, networking, and time management. It also supports Android. OpenGL is a group of graphics libraries, and I mainly use libraries like GLM, GLEW, and others when needed. SDL helps us create windows, and OpenGL is used to load 3D objects into these windows, along with math libraries and other tools."
    },
    {
        el: "p",
        content: "To create 3D characters, you will also need 3D modeling software. However, I am focusing on learning minimal 3D game development without using a game engine. I am a game programmer, not a game producer, so I want to learn how to make a game, not necessarily a fully production-ready game. Once I learn how to create windows, load 3D objects, and implement physics, I will be able to make any game."
    },
    {
        el: "p",
        content: "You can insert 3D characters and use them in your games, but my goal is to learn the basics of 3D game development without using a game engine for now."
    },
    {
        el: "p",
        content: "I have created a website where I will keep posting updates and sharing my progress related to game development. I wish you all the best for Navratri, as today is the eighth day of the festival, which is celebrated with great love by Gujarati people. Today, there is a special prayer for Mata, and I send my heartfelt wishes for a successful Navratri and upcoming Dussehra."
    },
    // an example of how to dynamically load script and run and import too
    {
        el: "script",
        content: "import {content} from './cloud/en/blog/2025/september/data/test_script.js'; console.log('content is',content);",
        props: [
            {
                type: "module",
            }
        ]
    },
];

