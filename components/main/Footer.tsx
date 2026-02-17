const Footer = () => {
  return (
    <footer className="border-t border-blue-900/30 py-8 mt-10">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <div className="text-sm text-gray-400">
          Made by{" "}
          <span className="text-blue-400 font-medium">hok-draft.web.id</span>
        </div>
        <div className="text-xs text-gray-600">
          Copyright © {new Date().getFullYear()} . All rights reserved.
        </div>
        <div className="text-xs text-gray-700 mt-4">
          Honor of Kings is a trademark of Tencent. This site is not affiliated
          with or endorsed by Tencent.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
